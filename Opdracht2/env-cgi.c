/* Show the CGI (Common Gateway Interface) environment variables */
#include <assert.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>

/* Print a basic HTTP header. */

static void
print_http_header(const char *content_type)
{
    printf("Content-Type: %s\n\n", content_type);
}

/* Handle errors by printing a plain text message. */

static void cgi_fail(const char *message)
{
    print_http_header("text/plain");
    printf("%s\n", message);
    exit(0);
}

int main()
{
    time_t t = time(NULL);
    struct tm *tm = localtime(&t);
    char s[64];
    assert(strftime(s, sizeof(s), "%c", tm));

    print_http_header("text/html");
    printf("<div>Time: %s<div>\n", s);

    char input[20];
    int lenstr = atoi(getenv("CONTENT_LENGTH"));
    FILE *f;
    /* printf("<div>lengte %d</div>\n", lenstr); */
    fgets(input, lenstr + 1, stdin);
    printf("<div id=\"input\">");
    char *token = strtok(input, "&");
    while (token != NULL)
    {
        printf("<div>%s</div>", token); //printing each token
        token = strtok(NULL, "&");
    }
    printf("</div>");
    return 0;
}
