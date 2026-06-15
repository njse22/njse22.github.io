---
id: linux-live-in-terminal
date: 2024.08.30
readTime: 40 MIN READ
readTimeEs: 40 MIN DE LECTURA
title: Linux Live In Terminal (Translation in progress...)
titleEs: Linux Live In Terminal
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
# Sobre este Articulo 

Este articulo fue creado como material de apoyo a los estudiantes de ingeniería
telemática para recordar conceptos básicos de sistemas operativos y manejo a
nivel inicial del sistema operativo Ubuntu Linux

# Sesión 1. Primeros pasos con Linux

## Sistema Operativo y Kernel

El concepto de sistema operativo y kernel suele ser fácilmente
confundido, al referirnos a *Linux* solemnes hacerlo
indiscriminadamente, para hablar de un conjunto de sistemas operativos
que, como Debian, Ubuntu, Fedora, Centos, Open Suse, Arch Linux, y un
largo etcétera de sistemas operativos, ¿Y qué es un sistema operativo?
Su definición puede ser compleja debido a lo complejo que puede ser un
sistema operativo en sí mismo, y a la cantidad de responsabilidades que
puede llegar a tener el mismo.

Un sistema operativo se encarga de actuar como un intermediario entre el
usuario y el equipo de hardware, con el objetivo de facilitar la
resolución de problemas de los usuarios, el hardware que se diseña y se
construye para la solución de estos problemas, puede ser complejo en sí
mismo, un computador, un celular, un microcontrolador, debido a esta
complejidad, es necesario que exista una capa de software que actúe como
intermediario entre el usuario de un ordenador y el hardware del mismo.

Ahora bien, si el hardware que se construye para la solución de
diferentes problemas específicos, la construcción del sistema operativo
que se encargue de ser intermediario, también puede ser diferente, es
por esa razón que existen tantos sistemas operativos y las funciones
incluidas varían mucho de un sistema a otro. Algunos ocupan poco
espacio, como por ejemplo, alpinelinux, y pueden carecer de interfaz
gráfica, como las distribuciones server, o versiones basadas en Yocto,
mientras que otros requieren gigabytes de espacio, como Windows.

Una definición más simplificada de lo que es un sistema operativo, y
quizá más acertada, es que un sistema operativo está compuesto por un
único programa que se ejecuta en todo momento en el equipo de usuario,
ese programa es conocido como el **Kernel**.

Linux se refiere formalmente al kernel del sistema operativo, el kernel
es la capa de software entre las aplicaciones y el hardware sobre el
cual se ejecutan. Las aplicaciones se ejecutan en una capa sin
privilegios llamada espacio de usuario, que no puede acceder al hardware
directamente. En su lugar, una aplicación realiza peticiones utilizando
la interfaz de llamada al sistema (*syscall*) para solicitar al kernel
que actúe en su nombre. Ese acceso al hardware puede implicar leer y
escribir en archivos, enviar o recibir tráfico de red, o incluso
simplemente acceder a la memoria. El kernel también es responsable de
coordinar los procesos concurrentes, permitiendo que muchas aplicaciones
se ejecuten a la vez, la figura 1, muestra esta interacción.


![](images/kernel_diagram.png)
> *Systemcalls* llamando al kernel adaptado de [^24]


Junto con el kernel, existen otros dos tipos de programas: los programas
de sistema, que están asociados al sistema operativo, pero no forman
parte necesariamente del kernel, y los programas de aplicación, que
incluyen todos los programas no asociados al funcionamiento del sistema,
es decir, el kernel es la capa que se encarga de interactuar con el
hardware, y el sistema operativo es un conjunto de aplicaciones, que
incluyen al kernel.

## Manejo de terminal

### Shell

El *shell* es un programa que tiene dos flujos: uno de entrada y otro de
salida. La entrada es un comando dado por el usuario, y la salida es el
resultado de ese comando, o una interpretación del mismo, el *shell*
principal en las principales distribuciones basadas en Linux se llama
Bash, no obstante, existen más *shells* disponibles en el sistema, para
validar la lista de *shells* disponibles se puede hacer de la siguiente
forma:

    $ cat /etc/shells
    # /etc/shells: valid login shells
    /bin/sh
    /usr/bin/sh
    /bin/bash
    /usr/bin/bash
    /bin/rbash
    /usr/bin/rbash
    /usr/bin/dash
    /usr/bin/screen
    /usr/bin/tmux

El comando [`cat`] es uno de los
comandos que nos ayuda a leer el contenido de un archivo.

la siguiente es una tabla de referencia de comandos que pueden ser
utiles para familializarse con linux:


| **Comando**    |**Descripción**
|----------------|------------------------------------------------------------------------------------------
|             ls | lista los archivos de un *filesystem*
|             cd | moverse a un directorio especifico [`cd /usr`]
|             cp | copia un archivo de un *filesystem* a otro
|             mv | mueve un archivo de un *filesystem* a otro
|            pwd | muestra la ruta del *filesystem* actual
|          touch | crea un archivo de texto vacio
|           less | para abrir y navegar en un archivo (no podría editarse)
|           tail | para ver el contenido final de un archivo
|           head | para el contenido inicial de un archivo
|            cat | para mostrar todo el contenido de un archivo
|          mkdir | para crear un directorio
|             rm | para eliminar un archivo
|            man | para ver la documentación de un comando [`man ls`]
|           grep | para filtrar o buscar contenido dentro de un archivo
|           find | para buscar un archivo o directorio
|          which | para mostrar en que *filesystems* se encuentra un programa especifico
> Tabla de referencia de comando de *shell*

## Vim

El editor de texto Vim [^1] es un editor de texto basado en terminal,
muy utilizado por ser muy liviano, y por su capacidad de extender
funcionalidades, gracias a su propio lenguaje de programación
*vimscript*, para abrir Vim basta con escribir el comando en la
terminal, una vez dentro del editor, se debe saber que en Vim hay
diferentes modos. El modo inicial (en el que se está apenas se entra al
editor) es el modo por defecto, también llamado modo normal. Los
comandos que más básicos en Vim son:
[`:q`], para salir del editor;
[`:w`], para guardar los cambios
sin salir del editor; [`:wq`],
para guardar y salir; y [`:q!`],
para salir sin guardar cambios. Para ingresar los comandos, es necesario
estar en el modo normal y escribir
[`:comando`][^2]. Para salir de
cualquier modo en Vim, se debe presionar la tecla
[`Esc`] esto hará que el editor
vuelva al modo normal.

### Navegación

Para navegar en Vim, estando en el modo normal, tradicionalmente se usan
las teclas [`h, j, k, l`]¸[^3],
las cuales se utilizan para moverse a la izquierda, abajo, arriba y
derecha, respectivamente, como se muestra en la siguiente lista:

- h = $\leftarrow$

- j = $\downarrow$

- k = $\uparrow$

- l = $\rightarrow$

En caso de querer moverse más rápido, se puede usar la tecla
[`w`], la cual lleva al inicio de
la palabra siguiente. Para moverse hacia el inicio de la palabra
anterior, se utiliza la tecla
[`b`]. Finalmente, para moverse al
final de la palabra siguiente, se emplea la tecla
[`e`].

Es posible moverse una cantidad 'n' de palabras (hacia arriba, abajo,
izquierda o derecha) combinando los operadores
[`h, j, k, l, w, b, e`] con el
número 'n' de palabras que se desea mover. Por ejemplo, si se quiere ir
cuatro palabras delante del cursor, se haría con
[`4w`]. De igual forma, para
moverse cuatro palabras detrás del cursor, se utilizaría
[`4b`]. Si se desea moverse cuatro
letras delante del cursor, se puede hacer con
[`4l`].

Vim tiene un buffer de navegación, lo que significa que la acción
anterior creó una 'lista' de acciones. Para volver a la acción anterior
en este punto, se debe presionar
[`Ctrl + o`]; si se desea ir a la
\"ación siguiente\", se haría con
[`Ctrl + i`].

Otra acción que podría ser necesaria es ir al principio, al final, o a
una línea específica 'n' del archivo. Esto se puede hacer con:
[`gg`] para ir al principio,
[`Shift + G`] (la 'G' mayúscula)
para ir al final, y [`nG`] (donde
'n' es el número de la línea a la cual se desea ir) para ir a una línea
específica.

Con [`Ctrl + G`], se puede ver en
qué línea se encuentra dentro de Vim. Más adelante, en la sección de
Configuración de Vim, se mostrará cómo habilitar los índices de las
líneas al lado izquierdo del editor.

### Búsqueda

Supongamos ahora que se desea buscar una palabra en el archivo. Esto se
puede hacer con [`/palabra`] para
buscar en el archivo después del cursor, y con
[`?palabra`] para buscar antes del
cursor.

Una vez ubicado en la palabra, puede ser necesario ir a la palabra
siguiente. Es importante tener en cuenta que, si se buscó con
[`/palabra`], la siguiente
coincidencia estará después del cursor; y si se buscó con
[`?palabra`], la siguiente
coincidencia estará antes del cursor. Para ello, se debe presionar
[`Enter`] y luego
[`n`]. Si se desea ir a la
coincidencia anterior, se puede hacer con
[`N`].

### Inserción

Para editar un archivo de texto en Vim, se debe entrar al modo
**INSERT**. Para ello, se presiona la tecla
[`i`]. Se sabrá que se está en
este modo porque en la parte inferior izquierda del editor aparecerá una
indicación.

En este modo, se puede empezar a editar a partir del lugar donde esté
ubicado el cursor. Si se quiere editar algo justo después del lugar
donde está ubicado el cursor, se presiona la tecla
[`a`]. Si se desea editar desde el
final de la línea de texto, se hace con
[`Shift + a`] (con la 'a'
mayúscula), lo que ubicará el cursor al final de la línea.

Si se desea agregar una nueva línea de comentario al código, se puede
hacer con la tecla [`o`] para
agregar una nueva línea debajo de la línea en la cual se encuentra el
cursor, y [`Shift + o`] (con la
'o' mayúscula) para agregar una línea arriba de donde está el cursor.

### Eliminación

Para eliminar texto en el modo normal, se presiona la tecla
[`x`]. También se puede eliminar
toda una línea de texto con
[`d + d`]. Si no se quiere
eliminar toda una línea, sino solo lo que está delante de una palabra,
por ejemplo, se puede hacer con
[`d + $`], que elimina todo lo que
esté delante del cursor.

Además, se puede eliminar utilizando las teclas de navegación
[`w, b`], y
[`e`]. Para eliminar la palabra (o
fracción de ella) que está delante del cursor, se usa
[`d + w`]. Con
[`d + b`] se elimina la palabra
que está antes del cursor. Si se desea eliminar una cantidad 'n' de
palabras que están delante del cursor, se haría con
[`d + ’n’ + w`]. Por ejemplo, para
eliminar las cuatro palabras que están delante del cursor, se usaría
[`d + 4 + w`]. Si se quiere
eliminar 'n' palabras que están antes del cursor, se puede hacer con
[`d + ’n’ + b`].

### Copiar y Pegar

Es posible copiar/cortar y pegar en Vim. Todas las opciones para
eliminar son en realidad opciones para cortar. Para pegar, se usa la
tecla [`p`] para pegar después del
cursor y [`Shift + p`] (la 'P'
mayúscula) para pegar antes del cursor. Por ejemplo, si se quiere cortar
y pegar una línea de texto, se puede usar
[`d + d`] para cortar toda una
línea de texto, y luego [`p`] para
pegar la línea después de la línea donde está el cursor. Si se desea
pegar antes de la línea donde está el cursor, se hace con P.

Para copiar un texto, primero se debe seleccionar. Esto se hace entrando
en el modo **VISUAL** con la tecla
[`v`]. En este modo, se puede
seleccionar texto con solo mover el cursor. Una vez seleccionado el
texto, se puede copiar con la tecla
[`y y`] pegarlo de la misma forma
que se ha visto antes, con la tecla
[`p`].

Si en algún momento se quiere copiar todo el contenido de un archivo de
texto diferente al archivo en el que se está trabajando, se puede hacer
con [`:r`] archivo, lo que copiará
el contenido del archivo en el archivo actual.

### Undo y Redo

Ahora que se conoce un poco más sobre el uso de Vim, se puede explorar
cómo deshacer y rehacer texto. Para deshacer, simplemente se presiona la
tecla [`u`].

Si se desea volver a un cambio específico después de realizar varios
cambios, se puede ver la lista de deshacer (undolist). Estando en el
modo normal, se escribe
[`:undolist`]. En esta lista se
encuentran los cambios realizados sobre el archivo, ordenados desde el
menos reciente al más reciente, de arriba hacia abajo. Las columnas de
la lista son, de izquierda a derecha: *number*, que es el número o
identificador del cambio; *changes*, que indica la cantidad de cambios
realizados; y *when*, que especifica cuándo se realizó el cambio. Si se
quiere volver a un cambio específico, se debe escribir
[`:undo N`], donde N es el número
o identificador del cambio. Si se quiere volver al cambio deshecho
anterior (redo) lo puedes hacer con
[`Ctrl + r`].

### Remplazar y cambiar palabras

Para reemplazar palabras en Vim. Para reemplazar un único carácter de
una palabra, se debe ubicar en la letra que se desea reemplazar, luego
presionar la tecla [`r`] y la
nueva letra; si se desea cambiar más de una letra en la misma palabra,
se puede hacer con [`R`].

Por lo general, es necesario cambiar más de una sola letra, así que
veamos cómo reemplazar toda una palabra o parte de ella. Para reemplazar
toda una palabra, se utiliza el comando
[`c + i + w`].

Para reemplazar parte de la palabra, se usa
[`c + w`], lo cual reemplaza la
parte de la palabra que está delante del cursor; es importante recordar
que, al usar alguno de estos comandos, se debe presionar la tecla
[`Esc`] para salir de estos modos.

Para reemplazar una palabra que se repite varias veces en el archivo
(por ejemplo, el nombre de una variable o la llamada a un método),
existen varias opciones. El comando: [`:s/palabra/nuevaPalabra`]

Este comando encuentra la primera coincidencia de 'palabra' en la línea
donde está el cursor y la reemplaza por 'nuevaPalabra'. Si se agrega una
[`g`] al final del comando, es
decir: [`:s/palabra/nuevaPalabra/g`]

De esta forma, se le indica al editor que cambie todas las coincidencias
de 'palabra' en la misma línea donde está el cursor por 'nuevaPalabra'.
Si se agrega [`%`] al principio
del comando, es decir: [`:%s/palabra/nuevaPalabra/g`]

En este caso se indica al editor que cambie todas las coincidencias de
'palabra' por 'nuevaPalabra' en todo el archivo.Para casos en los que no
se desea cambiar todas las palabras del documento, se puede agregar una
[`c`] al final del comando, es
decir: [`:%s/palabraOriginal/nuevaPalabra/gc`]

Esto hará que el editor pida confirmación para reemplazar las palabras.
En la parte inferior aparecerán las siguientes opciones:
[`y`], para confirmar el cambio;
[`n`], para omitirlo;
[`a`], para reemplazar todas las
coincidencias que están después del cursor;
[`l`], para cambiar la
coincidencia resaltada y salir de la operación;
[`q`], para salir de la operación;
y [`Ctrl + e`] y
[`Ctrl + y`], respectivamente,
para moverse hacia abajo y hacia arriba en el documento mientras se está
en este modo.

### [`:!`]

El comando [`:!`] se utiliza para
ejecutar comandos de Shell mientras se está en una sesión de Vim.

Por ejemplo, se puede ejecutar el comando
[`:! ls -la`] para listar los
archivos de la carpeta en la cual se encuentra. Al ejecutar este
comando, se despliega la lista de archivos y, al presionar Enter, se
regresa al editor. Esto es particularmente útil si se desea ejecutar
código cada vez que se agregan funcionalidades al mismo.

Supongamos ahora que se quiere crear un archivo de texto con información
del equipo, como la versión del kernel. Este tipo de tarea se puede
lograr combinando los comandos
[`:r`] y
[`:!`]. Para este ejemplo
particular, se usaría
[`:r ! uname -v`]. El texto se
insertará en el archivo en la línea siguiente a la que se encuentra el
cursor.

Anteriormente, se mencionó que se puede usar
[`:r`] archivo para copiar todo el
contenido de un archivo en Vim. Ahora, veamos cómo tomar solo las líneas
que interesan. Esto se logra con la ayuda de
[`:!`]. Por ejemplo, para tomar
las líneas cinco a siete de otro archivo de texto, se puede usar
[`:r !sed -n 5,7p archivo`].

### [`Ex, Vex`] y [`Sex`] si [`Sex`]

El comando Ex es la abreviatura de Explore y se usa para explorar dentro
de la carpeta de archivos en la cual se abrió Vim.

En caso de que se desee volver al archivo anterior, se puede volver a
ejecutar [`:Ex`] y buscar el
archivo. También se puede aprovechar el Buffer de navegación con
[`Ctrl + o`] y
[`Ctrl + i`] para navegar hacia
atrás y hacia adelante, respectivamente.

Los comandos [`Vex`] y
[`Sex`] son similares.
[`Sex`] se usa para abrir el
directorio actual de forma horizontal y
[`Vex`] lo abre de forma vertical.
De esta manera, se pueden abrir dos (o más) archivos en el mismo editor
de Vim.

Para salir de la ventana dividida, se utiliza el comando
[`:q`]. Si se desea guardar algún
cambio en el archivo abierto, se utiliza
[`:wq`].

# Sesión 2: Elementos y configuración del sistema. Parte I {#sesion2}

## File Systems

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

## Variables de entorno

El *Shell* de *Bash*, como cualquier otro lenguaje de programación,
tiene variables, algunas de ellas ya están incorporadas en el sistema
operativo, otras son incorporadas por algunos programas, y otras pueden
ser definidas por un usuario. estas ayudan al los scripts y a los
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

# Sesión 3. Redes y Procesos, configuración del sistema parte II

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

## Monitoreo de procesos

Un proceso es una instancia en ejecución de un programa, creado cuando
el programa se ejecuta. En Linux, cada comando como inicia un proceso,
que puede ser una tarea iniciada por el usuario, un script o un programa
invocado manual o automáticamente. La forma en que un proceso se crea e
interactúa con el sistema determina su tipo. Existen dos tipos de
procesos:

Los ***Foreground processes*** o interactivos, se inician y controlan a
través de una sesión de terminal y suelen ser iniciados por un usuario,
como por ejemplo la instalación de un paquete por medio del comando
[`apt`]. Estos procesos pueden
enviar resultados a la consola o aceptar entradas del usuario. Su
duración está ligada a la sesión de terminal, o su *Parent Process*, y
si el usuario sale del terminal mientras el proceso sigue en ejecución,
este terminará abruptamente debido a una señal SIGHUP enviada por el
proceso *Parent Process* al mismo.

Los ***Background processes*** o procesos no interactivos o automáticos,
se ejecutan independientemente de una sesión de terminal, sin esperar
ninguna interacción del usuario. Un usuario puede invocar varios
procesos en segundo plano dentro de la misma sesión de terminal sin
esperar a que ninguno de ellos finalice, un ejemplo de estos podrían ser
scripts que se programen para ejecutarse de forma automática.

El comando [`ps`] muestra la lista
de procesos en ejecución, del usuario que lo ejecuta, en el sistema
operativo, al agregar algunos modificadores se puede obtener más
información del comando, por ejemplo
[`ps aux`] lista los procesos que
pertenecen a todos los usuarios, y agrega algunas columnas de interés
para monitorear dichos procesos.

    $ ps aux
    USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
    root           1  0.0  0.3  22152 13176 ?        Ss   00:46   0:01 /sbin/init
    root           2  0.0  0.0      0     0 ?        S    00:46   0:00 [kthreadd]
    root           3  0.0  0.0      0     0 ?        S    00:46   0:00 [pool_workqueue_release]
    root           4  0.0  0.0      0     0 ?        I<   00:46   0:00 [kworker/R-rcu_g]
    root           5  0.0  0.0      0     0 ?        I<   00:46   0:00 [kworker/R-rcu_p]

De esta salida, algunas columnas importantes significan:

- **Process ID (PID)**: es el identificador que se le asigna al proceso
  cuando es creado, cada vez que se crea un proceso el kernel, le asigna
  a este el primer identificador disponible.

- **Status (STAT)**:

  - **D** uninterruptible sleep (normalmente un proceso de IO)

  - **I** hilo del kernel

  - **R** en ejecución o ejecutable (en cola de ejecución)

  - **S** suspensión interrumpible (espera a que se complete un evento)

  - **T** detenido por una *jod control signal*

  - **t** detenido por el depurador durante el rastreo

  - **W** paginación (no válido desde el kernel 2.6.xx)

  - **X** muerto (nunca debería verse)

  - **Z** proceso *defunct* («zombie»), terminado pero no cosechado por
    su *Parent Process*

- Uso de recursos - archivos abiertos, puertos de red y otros recursos
  que el proceso está utilizando (VSZ y RSS para el uso de memoria)

Otro ejemplo de este comando puede ser:
[`ps -eHf`]:

    $ ps -eHf | tail -7
    UID          PID    PPID  C STIME TTY          TIME CMD
    root        1331       1  0 00:48 ?        00:00:00   sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups
    root        1333    1331  0 00:48 ?        00:00:00     sshd: pasaporte [priv]
    pasapor+    1388    1333  0 00:48 ?        00:00:03       sshd: pasaporte@pts/0
    pasapor+    1389    1388  0 00:48 pts/0    00:00:00         -bash
    pasapor+    2137    1389  0 02:35 pts/0    00:00:00           ps -eHf
    pasapor+    2138    1389  0 02:35 pts/0    00:00:00           tail -7
    root        1761       1  0 01:34 ?        00:00:00   /usr/libexec/upowerd

En este caso se agrega él [`PPID`]
o *Parent Process PID*, que corresponde al *Parent Process* del proceso,
y hace una indentación de los procesos según su jerarquía

En caso tal que se quiera buscar el PID de un proceso específico, se
puede utilizar el comando,
[`pgrep <nombre del programa>`]
por ejemplo:

    $ pgrep python
    1331
    1333
    1388

### kill

El comando [`kill`], aunque su
nombre indique lo contrario, no es para matar un proceso como se suele
pensar, el comando realmente envía una *signal* [^23] a un proceso dado
su PID, por defecto si se ejecuta un comando como:

    $ kill 1973

Lo que hace el comando es enviar la *signal* correspondiente a la acción
*terminate*, cada *signal*, tiene un valor numérico asociado, hay muchas
*signals* y abarcarlas, todas podría ser una tarea difícil, pero esta es
una lista resumida de algunas que pueden ser útiles:

- SIGHUP (1) -- "hangup": interpretado por muchas aplicaciones -por
  ejemplo, nginx- como «relee tu configuración porque le he hecho
  cambios».

- SIGINT (2) -- "interrupt": «interrumpir»: a menudo interpretado igual
  que SIGTERM - «por favor, cierra limpiamente.»

- SIGTERM (15) -- "terminate": «terminar»: pide amablemente a un proceso
  que se cierre.

- SIGKILL (9) - SIGKILL no puede ser atrapado y manejado por procesos.
  Si esta señal es enviada a un programa, el sistema operativo
  **matará** ese programa **inmediatamente**. Cualquier código de
  limpieza, como el lavado de escrituras o el apagado seguro, no se
  realiza, por lo que esto es generalmente un **último recurso**, ya que
  podría conducir a la corrupción de datos.

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
