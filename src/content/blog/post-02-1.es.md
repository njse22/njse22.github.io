---
id: linux-live-in-terminal
date: 2024.08.30
readTime: 12 MIN READ
readTimeEs: 12 MIN DE LECTURA
title: Linux Live In Terminal (Part II - Vim) (Translation in progress...)
titleEs: Linux Live In Terminal (Parte II - Vim)
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
para una series de post, este es el segundo artículo de este post en el cual
abarcaremos el manejo básico de Vim

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
