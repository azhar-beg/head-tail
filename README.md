`'usage: head [-n lines | -c bytes] [file ...]'`

```
head file1 file2 ...
    display first lines of a file. By default it will show maximum 10 lines.
    It should work for multiple files in the same way.
 
head -n lines file1 file2 ..
    Displays the first count of lines as specified in option.

head -c bytes file1 file2
    Displays first count of bytes as mentioned in option.
 ```