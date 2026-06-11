# Sobre esta guía

Esta guía es parte de las que desarrollé para mi curso de *Administración de
plataformas*. Sirve como una introducción a la automatización de redes
utilizando Python y Paramiko, además de proporcionar un ejemplo básico del uso
de Ansible. Esta práctica se realizó utilizando una VM con Ubuntu Server 24.04
LTS.


# ¿Qué es Ansible?

Ansible es un framework de automatización de infraestructura que permite
automatizar la configuración de servidores y aplicaciones. También soporta la
configuración de equipos de red a través de conexiones SSH.

# Instalación de Ansible

``` bash
sudo apt update
sudo apt install ansible -y 
```

# Manejo de las llaves SSH para Ansible

En el servidor donde ejecutaremos *Ansible*, debemos generar un par de llaves
públicas y privadas para que los equipos a aprovisionar puedan validar nuestra
identidad:

``` bash
$ ssh-keygen -t rsa -b 4096

Generating public/private rsa key pair.
Enter file in which to save the key (/home/user/.ssh/id_rsa): /home/user/.ssh/key_name
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/user/.ssh/key_name
Your public key has been saved in/home/user/.ssh/key_name.pub
The key fingerprint is:
SHA256:XXXXXXXXXXXXXXXXXXXXX/XXXXXXXXXXXXXXXXXXXX user@user
The key randomart image is:
+---[RSA 4096]----+
|. o...o.o        |
|oO o . *+.       |
|*o* + B.+o       |
|=oo. B +..       |
|oo. o . So.      |
| .  . ..o  =     |
|   o o .. + o    |
|E ..o o  . .     |
| .o. +.          |
+----[SHA256]-----+
```

A continuación, debemos iniciar el agente SSH y configurar las variables de
entorno necesarias para que nuestro shell pueda comunicarse con él.

``` bash
$ eval "$(ssh-agent -s)"
> Agent pid 666
```

Luego, debemos añadir la clave SSH al agente utilizando `ssh-add` para cargar
la clave privada:

``` bash
ssh-add /home/user/.ssh/key_name
```

Posteriormente, debemos agregar la clave pública a los hosts de *Ansible*. La
forma *tradicional* de hacerlo es copiando la llave a cada uno de los equipos:

``` bash
ssh-copy-id -i ./home/user/.ssh/key_name <USER>@<IP>
```

Sin embargo, *Ansible* nos permite automatizar esta tarea; para esta
tarea deberemos crear un *playbook* de la tarea:

``` yaml
---
- name: Distribute SSH public key
  hosts: servers
  gather_facts: no
  tasks:
    - name: Make sure the key is present
      ansible.posix.authorized_key:
        user: <REMOTE_USER>
        state: present
        key: "{{ lookup('file', '<PATH_PUBLIC_KEY>') }}"
```

Además de esto hay que definir el *inventario* de equipos a
aprovisionar, en *Ansible* este inventario se puede definir en formato
[`yaml`]{style="background-color: new_icesi_gray_2"}:

``` yaml
all:
  children:
    servers:
      hosts:
        server_1:
          ansible_host: 192.0.2.10
        server_2:
          ansible_host: 192.0.2.20
        server_3:
          ansible_host: 192.0.2.30
    production:
      children:
        servers:
      vars:
        ansible_user: <REMOTE_USER>
        ansible_ssh_private_key_file: <PATH_PRIVATE_KEY>
```

Antes de ejecutar el *Playbook* de *Ansible* se debe asegurar que el
servidor que orquestará el aprovisionamiento los conozca para ello,
deberemos agregarlos a los *know host* de ssh:

``` bash
ssh-keyscan -f servers.txt >> ~/.ssh/known_hosts
```

Donde *servers.txt* tiene la lista de direcciones IPs de los servidores a
conectarse (NOTA: esta es una forma muy sencilla de gestionar inventarios de
red, sin embargo podríamos integrar otras soluciones como NetBox); luego
podemos ejecutar el playbook:

``` bash
ansible-playbook -i inventory.ini push_keys.yml --ask-pass
```

Se puede validar la conexión con los equipos con el comando:

``` bash
ansible servers  -m ping -i inventory.yml
```

# Automatización de redes con Paramiko

Paramiko es un módulo de Python que permite la conexión a servidores remotos
utilizando SSH, es un módulo muy útil para automatizar tareas de red, y es una
alternativa que nos puede dar un poco mas de flexibilidad para la
automatización de redes. Sin embargo requiero de conjunto de pasos adicionales
y la escritura de código para cumplir con la tarea en cuestión.

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
