---
id: linux-live-in-terminal
date: 2024.08.30
readTime: 9 MIN READ
readTimeEs: 9 MIN DE LECTURA
title: Linux Live In Terminal (Part V - Enviroment Variables and Package Management) (Translation in progress...)
titleEs: Linux Live In Terminal (Part V - Variables de Entorno y Manejo de Paquetes)
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
para una series de post, este es el quinto artículo de la serie, en este
abordaremos el tema de variables de entorno y mecanismos de instalación de
paquetes.

## Variables de entorno

El *Shell* de *Bash*, como cualquier otro lenguaje de programación,
tiene variables, algunas de ellas ya están incorporadas en el sistema
operativo, otras son incorporadas por algunos programas, y otras pueden
ser definidas por un usuario. estás ayudan al los scripts y a los
programas a obtener información del sistema y almacenar datos
temporales.

Al usar el comando [`env`] se
puede verificar el valor de algunas variables [^14] de entorno que se
encuentran definidas en el sistema, algunas de estas son:

- \$SHELL - *shell* que se usa el usuario actual.

- \$PWD - Directorio actual al momento de ejecutar el comando.

- \$OLDPWD - Directorio/ubicación inmediatamente anterior en la que se
  estaba antes de ejecutar el comando.

- \$USER - Nombre del usuario actual.

- \$PATH - Es una lista de rutas a diferentes *filesystem* donde puede
  haber scripts o comandos de diferentes aplicaciones.

Crear una variable de entorno es tan sencillo como:

    $ MY_VAR="This is a variable"
    $ echo $MY_VAR
    This is a variable

Esta variable es accesible únicamente en la sesión actual del *shell* si
se cierra la sesión, del *shell* o del usuario, esta variable dejará de
existir, para que sean \"permanentes\" se debe definir la variable en
uno de los archivos de configuración adecuados, ¿dónde hacerlo? Depende
si la variable será usada por un usuario o un grupo, en el primer caso
la variable debería ser definida en el archivo
[`$HOME/.profile`] [^15] en caso
tal de que la configuración deba ser aplicada para todo el sistema
operativo, debería modificarse en el archivo
[`/etc/profile`] [^16]

Por ejemplo, para definir la variable de entorno anterior se debería
modificar el archivo
[`$HOME/.profile`] y quedaría con
este contenido:

    # if running bash
    if [ -n "$BASH_VERSION" ]; then
        # include .bashrc if it exists
        if [ -f "$HOME/.bashrc" ]; then
            . "$HOME/.bashrc"
        fi
    fi

    # set PATH so it includes user's private bin if it exists
    if [ -d "$HOME/bin" ] ; then
        PATH="$HOME/bin:$PATH"
    fi

    # set PATH so it includes user's private bin if it exists
    if [ -d "$HOME/.local/bin" ] ; then
        PATH="$HOME/.local/bin:$PATH"
    fi

    ## Add Enviroment Vars
    MY_VAR="This is a variable"

### \$PATH

La variable de entorno \$PATH es una de las más importantes en Linux
[^17], ya que esta variable define las rutas de los scripts que consulta
el *Shell* al momento de ejecutar un comando, si se ejecuta el comando:

    $ echo $PATH
    /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin

Obtendremos el valor actual de la variable de entorno
[`$PATH`], esta hace referencia a
una lista de directorios, separados por dos puntos \":\", donde el
*shell* consulta los comandos ingresados por el usuario, algunos de
ellos ya han sido mencionados en sesiones anteriores, al instalar un
nuevo programa, en la mayoría de los casos el instalador se encarga de
dejar un ejecutable en el *filesystem /usr/bin*, el cual está
referenciado en la variable de entorno
[`$PATH`] y por ende puede ser
ejecutado

El archivo [`$HOME/.profile`]
mostrado en esta sesión, consulta y actualiza la variable de entorno
\$PATH, agregándole, por ejemplo, el *filesystem
[`$HOME/.local/bin`]*, donde el
usuario podría definir scripts propios para su usuario.

En caso tal de que se desee agregar más scripts que sean visibles para
los usuarios, como por ejemplo los scripts de aplicaciones que puedan
quedar instaladas en el
[`/opt/bin`] deberían de ser
agregados a la variable [`$PATH`],
en el archivo [`.profile`] por
ejemplo:

    # if running bash
    if [ -n "$BASH_VERSION" ]; then
        # include .bashrc if it exists
        if [ -f "$HOME/.bashrc" ]; then
            . "$HOME/.bashrc"
        fi
    fi

    # set PATH so it includes user's private bin if it exists
    if [ -d "$HOME/bin" ] ; then
        PATH="$HOME/bin:$PATH"
    fi

    # set PATH so it includes user's private bin if it exists
    if [ -d "$HOME/.local/bin" ] ; then
        PATH="$HOME/.local/bin:$PATH"
    fi

    ## Update $PATH var
    PATH="$PATH:/opt/bin"

    ## Add Enviroment Vars
    MY_VAR="This is a variable"

## Instalación de paquetes

### [`apt`]

En Ubuntu, el sistema de gestión de paquetes predeterminado es
[`APT`] (Advanced Package Tool).
En otras distribuciones de Linux existen otros gestores de paquetes,
como [`rpm`] para las
distribuciones basadas en RedHat y
[`pacman`] para las versiones
basadas en ArchLinux[^18]. En esta sección, se enfocará en
[`APT`] y sus funcionalidades.

Dado que Ubuntu es una distribución basada en Debian, hereda también el
sistema de gestión de paquetes de esta. Todos los archivos de los
paquetes contienen los recursos necesarios para implementar una función
o aplicación de software en el sistema operativo. En el caso de Ubuntu,
estos archivos suelen tener la extensión
[`.deb`] y están disponibles en un
repositorio. [^19]

Para buscar un paquete, y validar si está disponible en el repositorio,
se utiliza, el siguiente comando:

    $ sudo apt search cowsay
    Sorting... Done
    Full Text Search... Done
    cowsay/noble 3.03+dfsg2-8 all
      configurable talking cow

    cowsay-off/noble 3.03+dfsg2-8 all
      configurable talking cow (offensive cows)

    presentty/noble 0.2.1-1.1 all
      Console-based presentation software

    xcowsay/noble 1.6-1build2 amd64
      Graphical configurable talking cow

Actualizar paquetes del sistema operativo, como recomendación, es buena
practica actualizar los paquetes del sistema operativo despues de
instalar el sistema operativo o antes de instalar un nuevo paquete.

La base de datos de apt, donde estan todos los archivos de aplicaciones,
estaban definidos en el *filesystem /etc/apt/sources.list*, esto sigue
siendo así para las versiones de Ubuntu iguales o inferiores a la
$22.04$, en la nueva versión $24.04$ se ha movido a
*/etc/apt/sources.list.d/ubuntu.sources*, al ejecutar el comando
[`upadte`] se actualizara el
indice de paquetes local, con la versión del repositorio remoto.

    $ sudo apt update

Instalar paquetes:

    $ sudo apt install cowsay

Si por alguna razón quiere instalar un paquete que no esta definido en
el repositorio de paquetes del sistema operativo, porque no ha sido
agregado, o porque el que esta definido en el repositorio es una versión
anterior, se puede sobre escribir la fuente del paquete usando el
comando [`apt-apt-add-repository`]

    $ sudo add-apt-repository ppa:gnuradio/gnuradio-releases
    $ sudo apt-get update
    $ sudo apt-get install gnuradio

Para eliminar un paquete, se utiliza el paquete
[`remove`], como recomendación, se
debería agregar el comando
[`--purge`] el cual elimina los
archivos de configuración de la aplicación, si por alguna razón se
quiere conservar, los archivos de configuración puede omitir esta
opción.[^20]

    $ sudo apt remove cowsay --purge

Debido a que el repositorio de paquetes del sistema operativo, puede
cambiar constantemente, es recomendable eliminar los paquetes, que se
instalaron como dependencias de otros paquetes, y que al ser
actualizados, o eliminados, ya no son necesarios, para ello puede usar
el comando:

    $ sudo apt autoremove

### [`snap`] y [`flatpak`]

Snap y Flatpak son tipos de paquetes relativamente nuevos. Ambos están
basados en la ejecución de aplicaciones en contenedores aislados,
mejorando la seguridad y portabilidad. Ambos sistemas han sido creados
para facilitar la instalación y distribución de aplicaciones de
escritorio, especialmente para los *independent software vendors* (ISV)
y mantenedores de la comunidad, esto permite crear una sola aplicación
empaquetada, en lugar de crear múltiples paquetes como
[`.deb`] para Debian/Ubuntu y
[`.rpm`] para Fedora/RHEL,
[`snap`] y
[`flatpak`] simplifican este
proceso al ofrecer un método unificado de distribución.

En el caso de [`snap`], este es
soportando por *Canonical*, los creadores de Ubuntu, y lo han dejado
preinstalado en las últimas versiones de Ubuntu,
[`snap`] al igual que
[`apt`] se utiliza para buscar,
instalar, actualizar y eliminar paquetes.[^21] En el caso de Flatpak, es
un proyecto independiente sin vínculos directos con ninguna distribución
específica de Linux, y a diferencia de snap, es soportado por una mayor
cantidad de distribuciones.

La siguiente tabla resume algunos de los comandos que pueden usar ambas
herramientas:

|                                                       **snap** | **flatpak**                                                        |   **descripción**
| -------------------------------------------------------------- | ------------------------------------------------------------------ | -----------------
|  [`snap --version`] | [`flatpak --version`]  |   gestor de paquetes
|[`snap list`] | [`flatpak list`]     |  instalados con la herramienta
|[`snap find package`] | [`flatpak search package`] | en el repositorio del gestor e imprime la información del mismo
|[`sudo snap install `] | [`sudo flatpak install `] | instala un paquete
|[`sudo snap remove`] | [`sudo flatpak uninstall`] | elimina un paquete
> Resumen de comandos de [`snap`] y [`flapak`]

## AppImage e instalación por código fuente

Existen otras herramientas de instalación que al igual que snap y
flatpak, buscan ser independientes del sistema operativo, una de ellas
son los archivos [`.AppImage`],
los cuales son archivos con toda la aplicación empaqueta, en este caso,
si la aplicación tiene alguna dependencia el usuario debe instalarla por
medio de su gestor de paquetes tradicional, luego debe darle permisos de
ejecución a la aplicación y podrá usarla sin problema.

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
