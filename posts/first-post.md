# Sobre esta guía

Esta guía es, es parte de las guías que desarrolle para mi curso de
*Administración de plataformas*, la misma es una introducción a la
automatización de redes utilizando Python y Paramiko, además de dar un ejemplo
básico del uso de Ansible

# Automatización de redes

```bash
sudo apt install python3-venv 
python3 -m venv ~/.venv/networking
source ~/.venv/networking/bin/activate
pip install paramiko
pip install ansible-libssh
```

Antes de probar esta guía, deben validar conexión y entrada por ssh a
los equipos.

Si va a validar ssh desde un equipo Linux, para conectarse por sshv2
debe usar el siguiente comando:

```bash
ssh -oKexAlgorithms=+diffie-hellman-group14-sha1 -oHostKeyAlgorithms=+ssh-rsa <USER>@<HOSTNAME>
```

**NOTA:** Quizá sea necesario ejecutar el comando anterior con la
siguiente bandera:
[`-oCiphers=+aes256-cbc`]{style="background-color: new_icesi_gray_2"}
dado el caso de que el router y el servidor no soporten los mismos
algoritmos de cifrado.

## Ejemplo con Paramiko

```python
import paramiko
import threading
import os

def connect(server_ip: str, server_port: int, user: str, password: str) -> paramiko.SSHClient:
    ssh_client = paramiko.SSHClient()
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    ssh_client.connect(
            hostname=server_ip,
            port=server_port,
            username=user,
            password=password,
            look_for_keys=False, allow_agent=False
            )

    return ssh_client

def get_shell(ssh_client: paramiko.SSHClient) -> paramiko.Channel:
    return ssh_client.invoke_shell()

def send_command(shell: paramiko.Channel, command: str, timeout: int = 1):
    shell.send(command+'\n')
    time.sleep(timeout)

def show(shell: paramiko.Channel, n: int = 10000) -> str:
    output = shell.recv(n)
    return output.decode("utf-8")

if __name__ == "__main__":
    router = {
            'server_ip': '192.168.122.118', 
            'server_port': 22, 
            'user': 'admin', 
            'password': 'admin'
            }

    ssh_cli = connect(**router)
    shell = get_shell(ssh_cli)
    send_command(shell, "enable")

    output = show(shell)
    print(output)
```

main.py:

```python
import paramiko_utils
import time
import threading

routers = [
            {
                'server_ip': '192.0.2.10', 
                'server_port': '22', 
                'user': 'admin', 
                'password': 'admin'
            }, 
            {
               .
               .
               .
            }
        ]

def connect_and_run(router: dict):
    print(f'Conecting to -> {router["server_ip"]}')
    client = paramiko_utils.connect(**router)
    shell = paramiko_utils.get_shell(client)

    print(f'Sending commands to -> {router["server_ip"]}')
    paramiko_utils.send_command(shell,"terminal length 0\n")
    paramiko_utils.send_command(shell,"show version\n")
    paramiko_utils.send_command(shell,"show ip int brief\n")

    print(f'Results from -> {router["server_ip"]}')
    output = paramiko_utils.show(shell)
    print(output)
    time.sleep(2)

threads = list()

for router in routers:
    th = threading.Thread(target=connect_and_run, args=(router,))
    threads.append(th)
    th.start()

for th in threads:
    th.join()
```

## Ejemplo con Ansible (sobre una máquina linux)

Inventario:

```yaml
[cisco]
R1 ansible_host=192.0.2.X
S1 ansible_host=192.0.2.Y

[cisco:vars]
ansible_connection=ansible.netcommon.network_cli
ansible_network_os=cisco.ios.ios
ansible_user=admin
ansible_password=admin
```

De forma alternativa el inventario también se puede definir en formato
YAML

```yaml
all:
  children:
    cisco:
      hosts:
        R1:
          ansible_host: 192.0.2.X
      vars:
        ansible_connection: ansible.netcommon.network_cli
        ansible_network_os: cisco.ios.ios
        ansible_user: admin
        ansible_password: admin
        # Only for old devices
        ansible_ssh_common_args: >
          -o KexAlgorithms=+diffie-hellman-group14-sha1
          -o HostKeyAlgorithms=+ssh-rsa
          -o Ciphers=+aes256-cbc
```

Crear el archivo ansible.cfg y especificar el invetario

```bash
ansible-config init --disable -t all > ansible.cfg
```

Playbook

```yaml
---
- hosts: cisco
  gather_facts: false
  tasks:
    - name: show host name
      cisco.ios.ios_command: 
        commands: 
          - show run 
      register: output

    - name: show output
      ansible.builtin.debug:
        msg: '{{output}}'
```

# Configuración SSH switch cisco

```bash
conf terminal 
hostname s1
username ansible password Ansible123 privilege 15
ip ssh server
ip ssh password-auth 
interface vlan 10
ip address 192.0.2.X 255.255.255.0
no shutdown 
exit
```

# Configuración SSH Router Cisco

```bash
conf terminal 
hostname r1 
username admin privilege 15 secret admin
ip domain-name cisco.infra
crypto key generate rsa modulus 2048 
ip ssh version 2 
line vty 0 4 
transport input ssh telnet 
login local 
exit
interface ethernet 0/0
ip address 192.0.2.X 255.255.255.0 
no shutdown 
exit       
```
