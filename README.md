**Head-**
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

 **Tail-**
`'usage: tail [-c # | -n #] [file ...]'`

```
  tail file1 file2
    -- display the last part of a file.

 -n number
    The location is number lines.
    Should display given number of last lines.

  -c number
    The location is number bytes.
    Should display given number of last characters.

  -r file1 file2
    The -r option causes the input to be displayed in reverse order, by line.  Additionally, this option changes the meaning of the -b, -c
    and -n options.  When the -r option is specified, these options specify the number of bytes, lines or 512-byte blocks to display,
    instead of the bytes, lines or blocks from the beginning or end of the input from which to begin the display.  The default for the -r
    option is to display all of the input.

  -q file1 
    Suppresses printing of headers when multiple files are being examined.
```
