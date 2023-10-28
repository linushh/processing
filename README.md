# processing
simple web app to show processing data and strongswan logging.
HOW TO:

This server will refresh it self every 5 seconds to update the cpu-usage and diskspace used.
1. Press "refresh" to show CPU usage, diskspace used, diskspace left.

Press "log" to show ipsec statusall.
Unless you want to login manually every time you want to see ipsec statusall i suggest you are logged in as a superuser or do the following.
1. Run the command "sudo visudo".
2. Somwhere in the document add this line: <user ALL=(ALL) NOPASSWD: /usr/sbin/ipsec statusall> where "user" is the name of the actual user.
3. run the program. 