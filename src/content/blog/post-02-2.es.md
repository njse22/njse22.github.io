---
id: linux-live-in-terminal
date: 2024.08.30
readTime: 7 MIN READ
readTimeEs: 7 MIN DE LECTURA
title: Linux Live In Terminal (Part III - Filesystems) (Translation in progress...)
titleEs: Linux Live In Terminal (Parte III - Filesystems)
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
para una series de post, este es el tercer artículo de la serie, en este
hablaremos sobre los *Filesystem*

# Sesión 2: Elementos y configuración del sistema. Parte I {#sesion2}

## Filesystems

Los *File system* son una de las estructuras más básicas a nivel de
organización del sistema operativo, [^4] es el mecanismo que tiene el
sistema operativo para interactuar con sus usuarios, aplicaciones y las
capas de seguridad, dependen de como se haya estructurado el sistema de
almacenamiento en el sistema operativo.

Los *File System*, suelen ser agrupados en dos grupos distintos, por su
nivel de accesibilidad como lo son los **compartidos (shareable)** y los
**no compartidos (unshareable)**, los primeros pueden ser accedidos de
forma local y remota (usando *ssh* por ejemplo), los segundos solo
pueden ser accedidos de forma local; el segundo grupo se basa en su
*'capacidad de cambio'* como los **variables** como los documentos, que
pueden ser cambiados en cualquier momento y **estáticos** como los
archivos binarios que no pueden ser cambiados [^5]

## El comando df

Según el manual del sistema operativo de este comando, el cual puede
consultar con: `man df`, Muestra la información sobre el *file system*
en cada ARCHIVO sobre el cual reside, [^6] o sobre todos los *file
systems* por defecto, al ejecutar este comando puede obtener una salida
como esta:


    $ df -H
    Filesystem      Size  Used Avail Use% Mounted on
    tmpfs           1,7G  3,3M  1,7G   1% /run
    /dev/nvme0n1p3   12G  2,6G  8,9G  23% /
    /dev/nvme0n1p4  101G   39G   57G  41% /usr
    tmpfs           8,3G  107k  8,3G   1% /dev/shm
    tmpfs           5,3M  8,2k  5,3M   1% /run/lock
    /dev/nvme0n1p5  101G   24G   72G  26% /var
    /dev/nvme0n1p2  2,0G  186M  1,7G  11% /boot
    /dev/nvme0n1p7  787G  178G  570G  24% /home
    /dev/nvme0n1p1  536M  6,5M  530M   2% /boot/efi

Este comando es de utilidad para cuando se quiere verificar espacio de
disco, o en ciertos *file system* de interés, ademas de tenerlo como
referencia cuando se quiera montar o desmontar un nuevo *file system*

## File System principales

### /boot

El *File System /boot/* es el encargado de almacenar todos los archivos
estáticos necesarios para arrancar el sistema operativo, uno de ellos
por ejemplo es el archivo *config-X.Y.Z-AB-generic*, donde *X.Y.Z-AB*
hace referencia a la versión del kernel de Linux utilizado; [^7] este
archivo contiene las opciones de configuración con las que ese kernel
fue compilado. Estas opciones determinan qué características y módulos
están habilitados en el kernel.

### /dev

El *file system /dev/* se encarga de representar la información de los
dispositivos que se conectan al sistema operativo, estos dispositivos
usualmente suelen ser de flujo en serie de entrada y salida, como por
ejemplo un teclado o mause, o dispositivos de bloque, como discos duros
externos, por ejemplo si utilizamos el comando `df -H` después de
conectar un disco duro externo podemos obtener una salida como esta:


    $ df -H
    Filesystem      Size  Used Avail Use% Mounted on
    tmpfs           1,7G  3,3M  1,7G   1% /run
    /dev/nvme0n1p3   12G  2,6G  8,9G  23% /
    /dev/nvme0n1p4  101G   39G   57G  41% /usr
    tmpfs           8,3G  107k  8,3G   1% /dev/shm
    tmpfs           5,3M  8,2k  5,3M   1% /run/lock
    /dev/nvme0n1p5  101G   24G   72G  26% /var
    /dev/nvme0n1p2  2,0G  186M  1,7G  11% /boot
    /dev/nvme0n1p7  787G  178G  570G  24% /home
    /dev/nvme0n1p1  536M  6,5M  530M   2% /boot/efi
    /dev/sda1       984G  417G  517G  45% /media/user/_backup

A diferencia del comando `df` anterior, la última línea muestra como el nuevo disco
externo es accesible desde el *file system `/dev/sda1`*, tenga en cuenta
que en esta dirección, no podrá consultar los documentos del disco, para
ello existe el *file system /media* donde se montan de forma temporal
dispositivos extraíbles.

### /etc

Este *file system* está reservado para todos los archivos de
configuración locales del sistema operativo, por ejemplo, en */etc/vim/*
podrá encontrar el archivo *vimrc*, si tiene instalado *vim*, este
archivo es el archivo de configuración de este editor de texto, si
modifica alguna de las propiedades de este archivo, estaría modificando,
o extendiendo, las funcionalidades del editor.

Vale la pena aclarar que, así como *filesystem /etc* tiene las
configuraciones locales del sistema operativo, también podemos encontrar
el *file system  /user/.config* el cual hace referencia a los **archivos
de configuración del usuario**, al usar el comando:

    $ systemd-path system-configuration
    /etc

Por el contrarío si se usa el comando:

    $ systemd-path user-configuration
    /home/user/.config

Esto se hace de esta forma para separar las configuraciones, de un
usuario específico, y las del sistema que, normalmente, pueden ser
ejecutadas por múltiples usuarios.

En este *filesystem* también se encuentra */etc/passwd*, este archivo
almacena la información de los usuarios incluyendo su nombre de usuario,
la ruta de su *home directory*, el *shell* asignado, entre otros valores
asociados al usuario, cada uno de estos se encuentra separado por dos
puntos \":\".

### /usr

Este *filesystem* contiene archivos de soporte para usuarios regulares,
y puede llegar a ser común para varios usuarios o máquinas, al igual que
el *filesystem /* o *root*, este se subdivide en varios *filesystem*:
[^8]

- */usr/bin*\* - ejecutables del sistema

- */usr/lib*\* - librerías compartidas de */usr/bin*

- */usr/local* - programas compilados que no pertenecen a la
  distribución

- */usr/sbin*\* - programas específicos de administración del sistema

- */usr/share* - información compartida en */usr/bin* como algunos
  archivos de configuración, iconos, fondos de pantalla, o sonidos

### /var

Este *filesystem*, solo almacena datos variables, o que son modificables
por el usuario, como las bases de datos, en este *filesystem* podrá
encontrar */var/log* el cual contiene archivos que registran la
actividad del sistema.

### /opt

Este *filesystem* esta reserado para almacenar software y paquetes
adicionales que no son parte del sistema operativo por defecto, un
paquete instalado en este *filesistem* normalmente crea, subdirectorios
del tipo */opt/package/bin*, por ejemplo, este directorio almacenaría
los scripts de la aplicación instalada.

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
