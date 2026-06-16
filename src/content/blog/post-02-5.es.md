---
id: linux-live-in-terminal
date: 2024.08.30
readTime: 8 MIN READ
readTimeEs: 8 MIN DE LECTURA
title: Linux Live In Terminal (Part VI - Networking Management) (Translation in progress...)
titleEs: Linux Live In Terminal (Part VI - Networking Management)
summary: A practical guide to Linux concepts using Ubuntu.
summaryEs: Una guía práctica de conceptor de Linux utilizando Ubuntu.
author: u/njse22
authorRole: Telematics Engineering
authorRoleEs: Ing. Telematico
authorAvatar: https://avatars.githubusercontent.com/u/38898558?v=4
publishedDate: 2024.08.30
tags: ['NETWORKING', 'VIM', 'BASH', 'UBUNTU', 'LINUX']
image: "./images/banner_blog_02.png"
---
## Sobre este Artículo 

Este artículo fue creado originalmente como material de apoyo a los estudiantes
de ingeniería telemática para recordar conceptos básicos de sistemas operativos
y manejo a nivel inicial del sistema operativo Ubuntu Linux, ha sido adaptada
para una series de post, este es el sexto artículo, de la serie, en este
hablamos del manejo de las interfaces de red, configuración de las mismas
usando `netplan` en ubuntu y el manejo de `ufw`

## Conexiones de red en Linux

### ip command

El comando [`ip`] se utiliza para
mostrar y manipular los dispositivos de red del sistema operativo, [^22]
el comando [`ip`] genera cambios
inmediatos en la configuración de red del sistema; sin embargo, estas
configuraciones son temporales y pierden su efecto al momento de hacer
[`reboot`] del sistema, para tener
configuraciones permanentes es necesario modificar los archivos de
configuración del sistema operativo.

Para mostrar la configuración de red actual, puede usar cualquiera de
los siguientes comandos, todos muestran la misma información:

    $ ip address show
    $ ip addr
    $ ip a

Para verificar las rutas de red actuales en el sistema puede usar el
comando [`ip route`]

    $ ip route
    default via 172.30.0.1 dev enp0s3 proto dhcp src 172.30.156.187 metric 100
    172.30.0.0/16 dev enp0s3 proto kernel scope link src 172.30.156.187 metric 100
    172.30.0.1 dev enp0s3 proto dhcp scope link src 172.30.156.187 metric 100
    172.30.0.11 dev enp0s3 proto dhcp scope link src 172.30.156.187 metric 100
    172.30.0.12 dev enp0s3 proto dhcp scope link src 172.30.156.187 metric 100

Otro comando que puede ser útil, si se está intentando diagnosticar una
falla de red, o si se quiere validar la arquitectura de nuestra red
actual es [`ip neighbor`]

    $ ip neighbor
    172.30.0.1 dev enp0s3 lladdr 00:09:0f:09:1e:22 STALE
    172.30.0.11 dev enp0s3 lladdr 00:50:56:8e:1c:7a STALE
    172.30.164.92 dev enp0s3 lladdr 08:9d:f4:b7:27:3a REACHABLE
    172.30.0.10 dev enp0s3 lladdr 00:50:56:8e:ba:64 STALE
    fe80::2204:fff:fe7d:abb3 dev enp0s3 lladdr 20:04:0f:7d:ab:b3 router REACHABLE
    fe80::2204:fff:fe7d:27b3 dev enp0s3 lladdr 20:04:0f:7d:27:b3 router REACHABLE

Para ejemplificar como se pueden manipular las interfaces de red con el
comando [`ip`], se puede crear una
interface de red de tipo *dummy*, este tipo de interfaces son creadas
para hacer pruebas y debging en una red, para crearla:

    $ sudo ip link add eth0 type dummy

De esta forma se creará una nueva interfaz de red que puede ser
verificada con el comando
[`ip addr`]

    $ ip addr
    ...
    3: eth0: <BROADCAST,NOARP> mtu 1500 qdisc noop state DOWN group default qlen 1000
        link/ether 6e:b5:25:ef:ea:85 brd ff:ff:ff:ff:ff:ff

En este caso se creará una interfaz sin dirección IPv4 y que se
encuentra apagada, para prender (levantar o activar) la interfaz:

    $ sudo ip link set eth0 up
    $ ip adr
    ...
    3: eth0: <BROADCAST,NOARP,UP,LOWER_UP> mtu 1500 qdisc noqueue state UNKNOWN group default qlen 1000
        link/ether 6e:b5:25:ef:ea:85 brd ff:ff:ff:ff:ff:ff
        inet6 fe80::6cb5:25ff:feef:ea85/64 scope link
           valid_lft forever preferred_lft forever

En este caso la interfaz está prendida, pero sigue sin tener una
dirección ip:

    $ sudo ip addr add 192.168.99.10/24 dev eth0
    $ ip adr
    ...
    3: eth0: <BROADCAST,NOARP,UP,LOWER_UP> mtu 1500 qdisc noqueue state UNKNOWN group default qlen 1000
        link/ether 6e:b5:25:ef:ea:85 brd ff:ff:ff:ff:ff:ff
        inet 192.168.99.10/24 scope global eth0
           valid_lft forever preferred_lft forever
        inet6 fe80::6cb5:25ff:feef:ea85/64 scope link
           valid_lft forever preferred_lft forever

Si se quiere cambiar la dirección o direcciones del servidos DNS puede
hacerlo modificando el *filesystem /etc/resolv.conf* agregando con
[`nameserver <DNS-IP-SERVER>`]

Para borrar las configuraciones de la interfaz, se puede usar el
comando:

    $ sudo ip addr flush dev eth0

De cualquier forma, al momento de hacer un reboot del sistema, estas
configuraciones dejarán de existir

### netplan

[`netplan`] es una herramienta
para la configuración de las interfaces de red, es soportada por
canonical y es recomendada para la configuración de red en Ubuntu, la
herramienta se basa en la configuración de un archivo .yaml, que se
ubica en el *filesystem /etc/netplan*

Si se quiere configurar una interfaz para que se conecte a servidor
DHCP, deberíamos editar el archivo,
[`/etc/netplan/00-installer-config.yaml`]
de configuración, de la siguiente forma:

    network:
      version: 2
      renderer: networkd
      ethernets:
        eth0:
          dhcp4: true

luego de modificar el archivo, con permisos de superusuario, es
necesario ejecutar los comandos:

    $ sudo netplan generate
    $ sudo netplan apply

En la documentación, y/o foros, podría encontrar que en el atributo
[`render`] hacen referencia a
[`networkd`], este y
[`NetworkManager`] hacen
referencia al servicio que se utiliza para administrar las interfaces de
red. Para configurar la interfaz con una ip statica, el archivo podría
ser modificado de la siguiente forma:

    network:
      version: 2
      renderer: networkd
      ethernets:
        eth0:
          addresses:
            - 192.168.160.89/24
          routes:
            - to: default
              via: 192.168.160.1
          nameservers:
              addresses: [192.168.215.20, 192.168.215.30]

### firewall

El Kernel de Linux incluye una capa con la cual se puede manipular el
trafico de red del sistema operativo, la herramienta que da acceso a
esas funcionalidades es iptables, y esta funciona en todos los sistemas
operativos, que trabajen con el kernel de Linux, Canonical, desde la
versión 14.04 de Ubuntu a trabajo en
[`ufw`] (*Uncomplicated
Firewall*), este comando busca simplificar las tareas de administración
de firewall, la herramienta se puede entender como un traductor a
[`iptables`], o como una capa más
de abstracción que facilita la creación de reglas de firewall. Está
instalada por defecto en Ubuntu, pero se puede instalar en otras
distribuciones

Para habilitar o desabilitar la herramienta se usan los siguientes
comandos:

    $ sudo ufw enable
    $ ## Para desabilitarlo
    $ sudo ufw disable

Para validar el estado actual del firewall:

    $ sudo ufw status verbose
    Status: active
    Logging: on (low)
    Default: deny (incoming), allow (outgoing), disabled (routed)
    New profiles: skip

Dentro de las reglas, se puede permitir el tráfico hacia un puerto
específico, el protocolo [`tcp`] o
[`udp`], es opcional.

    $ sudo ufw allow 80/tcp

También se puede negar el acceso atreves de dicho puerto:

    $ sudo ufw deny 80/tcp

Podemos borrar las reglas:

    $ sudo ufw  delete deny 80/tcp

Eventualmente se puede consultar el estado de la herramienta:

    $ $ sudo ufw status
    Status: active

    To                         Action      From
    --                         ------      ----
    80/tcp                     ALLOW       Anywhere
    80/tcp (v6)                ALLOW       Anywhere (v6)

Para saber a qué puertos se les puede permitir o negar el tráfico, de un
puerto, es necesario que se sepa a qué servicio está asociado dicho
puerto, la *Internet Assigned Numbers Authority*, define la lista de lo
que se conoce como, *los puertos bien conocidos* y pueden ser
consultados en línea, otra forma, es consultar la lista de puertos del
*filesystem /etc/services*

    $ less /etc/services
    ftp             21/tcp
    fsp             21/udp          fspd
    ssh             22/tcp                          # SSH Remote Login Protocol
    telnet          23/tcp
    smtp            25/tcp          mail
    time            37/tcp          timserver

También se puede limitar el tráfico de una ip específica:

    $ sudo ufw allow from <ip-address>
    $ sudo ufw deny from <ip address>

## Referencias

[^1]: El mejor editor de texto que existe en el mundo

[^2]: Donde el comando debe ser remplazado por
    [`:q`],
    [`:w`] o cualquiera otro
    comando

[^3]: El usuario podría sobreescribir estas teclas en el archivo de
    configuración

[^4]: Recuerde que este concepto es aplicable para sistemas operativos
    basados en *Unix*, en el caso de los sistemas operativos Windows, la
    estructura de organización es otra

[^5]: Usualmente, los archivos binarios de algunas aplicaciones ubicadas
    en el file system */usr/local/bin*, o en el */boot* pueden ser
    editados por un usuario administrador, caso contrario de los
    ubicados en */bin* los cuales al abrirlos con un editor de texto se
    ven como archivos binarios

[^6]: Recuerde que en sistemas basados en *Unix*, todo es un archivo.

[^7]: Por favor, no confundir este archivo con el kernel en sí mismo, el
    kernel de Linux usualmente está ubicado el */usr/src*

[^8]: Los *filesystems* que han sido marcados con un \*, pueden ser
    encontrados en el *root* no es porque sean diferentes, realmente son
    enlaces simbólicos a estos *filesystems*, por ejemplo */bin* es un
    enlace simbólico a */usr/bin*

[^9]: Este comando es lo que se conoce como un comando interactivo, es
    decir que necesita de la entrada de datos del usuario para completar
    su tarea, también existe el comando
    [`useradd`], que no es
    interactivo; [`adduser`] es un
    script que por debajo llama al comando
    [`useradd`]

[^10]: tambiém se podría agregar el usuario a los dos grupos al mismo
    tiempo, al párametro [`-G`] se
    le especifica una lista de grupos:
    [`sudo usermod -aG sudo,devops linus`]

[^11]: por favor, no intente eliminar el grupo de los suders

[^12]: Hacen referencia a dispositivos como teclados o mause

[^13]: Por defecto, todos los archivos que se crean tiene los permisos
    664

[^14]: El comando [`set`] muestra
    la lista completa con todas las definiciones

[^15]: En documentación y/o referencias podría encontrar que hacen
    referencia a un archivo llamado
    [`$HOME/.bash_profile`] , la
    diferencia entre este y el
    [`$HOME/.profile`] es el orden
    en el que el *shell* los consulta

[^16]: En administración de servidores o grupos, montados sobre Linux,
    podrá encontrar que existe un *filesystem* en */etc/skel* donde
    también hay un archivo
    [`.profile`], este
    *filesystem* es usado para crear plantillas de configuración para
    diferentes usuarios

[^17]: Esto podría ser una apreciación personal, probablemente todas las
    variables de entorno tengan la misma importancia o relevancia, pero
    para nuestro caso y el diseño de esta guía he decidido darle una
    importancia particular

[^18]: [`zypper`],
    [`emerge`],
    [`apk`],
    [`eopkg`],
    [`guix`],
    [`dnf`], todos estos son
    gestores de paquetes, de distribuciones distintas

[^19]: puede consultar la información de un paquete en
    <https://launchpad.net/ubuntu>

[^20]: La opción [`--purge`]
    también puede usar el comando
    [`sudo apt purge`]

[^21]: el repositorio de aplicaciones puede ser consultado en:
    <https://snapcraft.io/>

[^22]: En internet podrá encontrar que en vez de este comando sugieren
    el uso de [`ifconfig`], este
    comando ya no está instalado por defecto en Ubuntu, y ha sido
    marcado como deprecated, de cualquier forma puede seguir siendo
    usado si se instala el paquete
    [`net-tools`], principalmente
    porque este brinda otras herramientas de red que hoy por hoy siguen
    siendo utilizadas

[^23]: Entienda una *signal* como un mensaje que se le envia a un
    proceso, por ejemplo, un proceso hijo puede enviarle una señal a su
    *parent process* para indicarle que termino su tarea, o un proceso
    puede enviarle un mensaje a otro programa activo para solicitarle
    una información especifica

[^24]: Learning eBPF Programming the Linux Kernel for Enhanced Observability, Networking, and Security
