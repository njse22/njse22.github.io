---
id: linux-live-in-terminal
date: 2024.08.30
readTime: 15 MIN READ
readTimeEs: 15 MIN DE LECTURA
title: Linux Live In Terminal (Part IV - Users, Groups and Permissions) (Translation in progress...)
titleEs: Linux Live In Terminal (Parte IV - Usuarios, Grupos y Permisos)
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
para una series de post, este es el cuarto artículo de la serie, en este
hablaremos del uso y manejo de usuarios, grupos y permisos

## Usuarios, Grupos y Permisos

En sistemas operativos basados en *Unix*, se puede entender a un usuario
o cuenta de usuario, como una entidad con un nombre de usuario y un
identificador único o UID; los usuarios pueden lanzar y poseer procesos,
poseer archivos y directorios y tener varios permisos sobre ellos, y se
les puede permitir o impedir hacer cosas o usar recursos en el sistema;
en Linux existen tres tipos de usuarios:

- **Normal o regular user**: Es un usuario de propósito general, o de
  uso personal, normalmente tienen asociada una sesión de *shell* y un
  directorio personal.

- **System Users**: son similares a los usuarios regulares, pero puede
  que no tengan una sesión de *shell* y un directorio personal asignado,
  estos usuarios son asignados a servicios de aplicaciones en segundo
  plano, por ejemplo, un servidor web que gestione solicitudes públicas,
  debería ejecutar sus servicios bajo un usuario que no tenga
  privilegios de inicio de sesión, o permisos de *root*

- **Superusers**: Estos usuarios tienen acceso completo a los recursos
  del sistema operativo, incluyendo la creación, modificación y
  eliminación de usuarios.

### El comando [`sudo`] (*superuser do*)

Por defecto, el usuario *root* es el superusuario de un sistema
operativo basado en Linux, idealmente, debería evitarse actuar o
trabajar con este usuario por temas de seguridad, es por ello que existe
el comando [`sudo`] el cual provee
un mecanismo para **promover** usuarios regulares a superusuarios usando
una capa adicional de seguridad.

### Agregar usuarios [`adduser`]

Para agregar un usuario, la sintaxis es:
[`sudo adduser USER_NAME`], en
nuestro caso: [^9]

    $ sudo adduser linus
    info: Adding user `linus' ...
    info: Selecting UID/GID from range 1000 to 59999 ...
    info: Adding new group `linus' (1001) ...
    info: Adding new user `linus' (1001) with group `linus (1001)' ...
    info: Creating home directory `/home/linus' ...
    info: Copying files from `/etc/skel' ...
    New password:
    Retype new password:
    passwd: password updated successfully
    Changing the user information for linus
    Enter the new value, or press ENTER for the default
    	Full Name []: linus
    	Room Number []:
    	Work Phone []:
    	Home Phone []:
    	Other []:
    Is the information correct? [Y/n] Y
    info: Adding new user `linus' to supplemental / extra groups `users' ...
    info: Adding user `linus' to group `users' ...

Podemos verificar la creación del usuario leyendo el contenido del
*filesystem /etc/passwd*

    $ cat /etc/passwd | grep linus
    linus:x:1001:1001:linus,,,:/home/linus:/bin/bash

Cada salida está delimitada por dos puntos (`:`)

- linus: Nombre de usuario

- x: Contraseña cifrada (el hash de la contraseña se almacena en
  /etc/shadow)

- 1001: El UID

- 1001: El ID del grupo de usuarios (GID)

- /home/linus: Carpeta de inicio del usuario

- /bin/bash: [`Shell`] de inicio
  de sesión por defecto para el usuario

Podríamos cambiar la contraseña del usuario usando:

    $ sudo passwd linus
    New password:
    Retype new password:
    passwd: password updated successfully

Eventualmente, también podríamos eliminar el usuario:

    $ sudo userdel -f -r linus

### Crear grupos [`groupadd`]

Los grupos son usados para organizar a los usuarios en los sistemas
operativos tipo *Unix*. En pocas palabras, un grupo es una colección de
usuarios que comparten un atributo común. Por ejemplo, agrupar a los
usuarios que pueden usar un software en común como
[`docker`], o por ejemplo hacer
que un usuario pueda acceder al comando
[`sudo`]

La creación de un grupo se realiza con el comando,
[`sudo groudapp GROUPNAME`] en
este caso supongamos la creación de un grupo llamado devops:

    $ sudo groupadd devops

podemos verificar la existencia del grupo usando el siguiente comando:

    $ cat /etc/group | grep devops

Ahora se podría agregar al usuario a dicho grupo:

    $ sudo usermod -aG devops linus

Y eventualemnete se podría agregar al conjunto de suders, o usuarios que
pueden usar el comando sudo, esto se hace de la siguiente forma: [^10]

    $ sudo usermod -aG sudo linus

Al verificar este cambio se ve la siguiente salida en consola:

    $ cat /etc/group | grep sudo
    sudo:x:27:user,linus

Eventualmente, si así se quiere, se podría eliminar el grupo en cuestión
[^11] esto lo podemos hacer de la siguiente forma:

    $ audo delgroup devops

### Permisos [`-rw-rw-rw-`]

Una vez entendida la diferencia entre grupo y usuario, y como crearlos y
eliminarlos, se puede hablar de los permisos, si ejecutamos el comando
[`ls -l`] podremos ver la
siguiente salida:

    $ ls -l
    total 104
    drwxr-xr-x  2 user user  4096 jun 28 11:27  Desktop
    drwxr-xr-x  8 user user  4096 jul 11 21:05  Documents
    drwxr-xr-x  6 user user 16384 jul 16 11:13  Downloads
    drwxr-xr-x  2 user user  4096 feb  3 13:36  Music
    drwxr-xr-x  4 user user  4096 feb  6 14:34  Pictures
    drwxrwxr-x  3 user user  4096 feb 17 11:17  Postman
    drwxr-xr-x  2 user user  4096 feb  3 13:36  Public
    drwxr-xr-x  2 user user  4096 feb  3 13:36  Templates
    drwxr-xr-x  3 user user  4096 feb 28 19:20  Videos

Esta salida, nos da información del tipo de archivo, sus permisos, a que
usuario y grupo pertence, ademas de la fecha de creación del mismo. La
primera columna muestra los permisos, el primer caracter indica que tipo
de archivo es:

- Archivo de texto plano: **-**\
  [`ls -l /etc/dhcp/dhclient.conf`]\
  [`-rw-r--r-- 1 root root 1735 ago 9 2021 /etc/dhcp/dhclient.conf`]

- Directorio: **d**\
  [`ls -l `]\
  [`drwxr-xr-x 2 user user 4096 jun 28 11:27 Desktop`]

- *Symbolic link*: **l**\
  [`ls -l /etc/os-release`]\
  [`lrwxrwxrwx 1 root root 21 abr 22 08:08 /etc/os-release -> `]\
  [`../usr/lib/os-release`]

- *Character File*: **c**\
  [`ls -l /dev/tty0`]\
  [`crw--w---- 1 root tty 4, 0 jul 16 18:17 /dev/tty0`]
  [^12]

Seguido a este caracter se encuntran los permisos del archivo:

`d`<span style="color:#e9b3ff">`rwx`</span><span style="color:#64e060">`r-x`</span><span style="color:#7d4698">`r-x`</span> `2` <span style="color:#e9b3ff"> `user` </span><span style="color:#64e060">`group`</span> 4096 jun 28 11:27 Desktop

Estos caracteres son conocidos como los *permission bits* los cuales
determinan si el archivo puede ser leido (**r**), escrito (**w**) o
ejecutado (**x**), estos a su vez se dividen en tres partes, los
permisos del usuario, resaltados en rojo; los permisos del grupo,
resaltados en azul; y los permisos para los *otros*, resaltados en
verde, asiendo referencia a cualquier usuario diferente al dueño o que
no pertenezca al grupo especificado.

Cada permiso tiene un valor numérico asignado, de esta forma:

- **r** = 4

- **w** = 2

- **x** = 1

Esta equivalencia se usa para asignar permisos en una representación
númerica, donde usamos tres números, el primero para los permisos del
usuario, el segundo para los permisos del grupo y el tercero a otros
usuarios; los valores se suman en la medida que se quiera asignar mas o
menos permisos, por ejemplo, si se quiere cambiar los permisos sobre un
archivo de tal forma que el usuario tenga permisos de lectura, escritura
y ejecución ($r, w, x \rightarrow 4 + 2 + 1 = 7$), que el grupo solo
pueda leer ($r = 4$) y que el grupo no pueda hacer nada, la combinación
de números sería entonces $740$, usando esta combinación con el comando
[`chmod`] se pueden cambiar los
permisos del archivo: [^13]

    $ touch hello.sh
    $ ls -l hello.sh
    -rw-rw-r-- 1 user user 0 jul 16 21:13 hello.sh
    $ sudo chmod 740 hello.sh
    $ ls -l hello.sh
    -rwxr----- 1 user user 0 jul 16 21:13 hello.sh

Si se quiere cambiar el grupo al cual pertenece este archivo se podría
hacer con el comando [`chgpr`]:

    $ sudo chgrp devops hello.sh
    $ ls -l hello.sh
    -rwxrw---- 1 user devops 43 Jul 17 19:12 hello.sh

Normalmente, en documentación o foros, suele encontrarse el comando
[`chown`] este comando sirve para
cambiar el propietario y el grupo de un archivo, por ejemplo, para hacer
que nuestro script cambie al usuario
[`root`] y al grupo
[`sudo`] (para los *suders*)

    $ sudo chown root:sudo hello.sh
    $ ls -l hello.sh
    -rwxrw---- 1 root devops 43 Jul 17 19:12 hello.sh

Y si se quiciera, se podría utilizar el mismo comando anterior para
cambiar unicamente el usuario:

    $ sudo chown user hello.sh
    $ ls -l hello.sh
    -rwxrw---- 1 user sudo 43 Jul 17 19:12 hello.sh

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
