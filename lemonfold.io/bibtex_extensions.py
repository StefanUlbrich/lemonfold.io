import pybtex.plugin
from dateutil import parser
from pybtex.style.formatting import toplevel
from pybtex.style.formatting.unsrt import Style, pages
from pybtex.style.sorting.author_year_title import SortingStyle
from pybtex.style.template import (
    field,
    optional,
    optional_field,
    sentence,
    tag,
    words,
)

# pylint: skip-file
print("Loading bibtex extensions")

class LemonfoldSortingStyle(SortingStyle):
    """Sort references by year in descending order."""
    def sorting_key(self, entry):
        if entry.type in ("book", "inbook"):
            author_key = self.author_editor_key(entry)
        elif "author" in entry.persons:
            author_key = self.persons_key(entry.persons["author"])
        else:
            author_key = ""
        return (entry.fields.get("year", ""), author_key, entry.fields.get("title", ""))

    def sort(self, entries):
        return sorted(entries, key=self.sorting_key, reverse=True)


class LemonfoldStyle(Style):
    """Support for patents. Remove bold formatting from notes.    """
    default_sorting_style = "lemonfold_sorting_style"

    # def __init__(
    #     self, label_style=None, name_style=None, sorting_style=None, abbreviate_names=False, min_crossrefs=2, **kwargs
    # ):
    #     super().__init__(label_style, name_style, sorting_style, abbreviate_names, min_crossrefs, **kwargs)

    def get_inproceedings_template(self, e):
        template = toplevel[
            sentence[self.format_names("author")],
            self.format_title(e, "title"),
            words[
                "In",
                sentence[
                    optional[self.format_editor(e, as_sentence=False)],
                    self.format_btitle(e, "booktitle", as_sentence=False),
                    self.format_volume_and_series(e, as_sentence=False),
                    optional[pages],
                ],
                self.format_address_organization_publisher_date(e),
            ],
            sentence[tag("b")[optional_field("note", apply_func=lambda x: x.plaintext().replace("\\textbf", ""))]],
            self.format_web_refs(e),
        ]
        return template

    def get_patent_template(self, e):

        type_dict = {"patentus": "U.S. Patent "}

        template = toplevel[
            self.format_names("author"),
            self.format_title(e, "title"),
            sentence[
                tag("em")[field("type", apply_func=lambda x: type_dict[x.plaintext()]), field("number")],
                field("holder"),
                words[field("date", apply_func=lambda x: parser.parse(x.plaintext()).strftime("%b %d, %Y"))],
            ],
            self.format_web_refs(e),
        ]
        return template


pybtex.plugin.register_plugin("pybtex.style.formatting", "lemonfold_style", LemonfoldStyle)
pybtex.plugin.register_plugin("pybtex.style.sorting", "lemonfold_sorting_style", LemonfoldSortingStyle)
