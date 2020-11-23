#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>

#define MAXLEN 80
/* 4 for field name "data", 1 for "=" */
#define MAXINPUT MAXLEN+2
/* 1 for added line break, 1 for trailing NUL */
#define DATAFILE "./data.txt"

void unencode(char *src, char *last, char *dest)
{
 for(; src != last; src++, dest++)
   if(*src == '+')
     *dest = ' ';
   else if(*src == '%') {
     int code;
     if(sscanf(src+1, "%2x", &code) != 1) code = '?';
     *dest = code;
     src +=2; }
   else
     *dest = *src;
 *dest = '\n';
 *++dest = '\0';
}

/* Print a basic HTTP header. */

static void
print_http_header(const char *content_type)
{
    printf("Content-Type: %s\n\n", content_type);
}

int main(void)
{
char *lenstr;
char input[MAXINPUT], data[MAXINPUT];
long len;

print_http_header("text/html");
printf("<TITLE>Response</TITLE>\n");
lenstr = getenv("CONTENT_LENGTH");
if(lenstr == NULL || sscanf(lenstr,"%ld",&len)!=1 || len > MAXLEN)
  printf("<P>Error in invocation - wrong FORM probably.");
else {
  FILE *f;
  fgets(input, len+1, stdin);
  unencode(input, input+len, data);
  f = fopen(DATAFILE, "a");
  if(f == NULL)
    printf("<P>Sorry, cannot store your data.");
  else
    fputs(data, f);
  fclose(f);
  printf("<P>Thank you! Your contribution has been stored.");
  }
return 0;
}
