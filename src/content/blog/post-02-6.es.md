---
id: linux-live-in-terminal
date: 2024.08.30
readTime: 7 MIN READ
readTimeEs: 7 MIN DE LECTURA
title: Linux Live In Terminal (Part VII - Process Management) (Translation in progress...)
titleEs: Linux Live In Terminal (Part VII - Manejo de Procesos)
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
para una series de post, este es el séptimo y último capítulo de la serie, en
este finalizaremos con el manejo de procesos 

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
