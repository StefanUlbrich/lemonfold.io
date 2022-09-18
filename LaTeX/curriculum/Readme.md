# LaTeX Templates

This folder contains my personal $\LaTeX$ templates for

* curriculum vitae
* publication list
* publication list sorted by type
* bibliography file (also used in the blog)

## Compile the Publication list

To compile (if used outside of visual studio code):

```bash
# Make sure biber is installed
which biber  # e.g., /usr/local/texlive/2019/bin/x86_64-darwin//biber
pdflatex publication.tex
biber publication
pdflatex publication.tex
pdflatex publication.tex
```
