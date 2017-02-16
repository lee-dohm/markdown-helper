# Markdown Helper

[![Build Status](https://img.shields.io/travis/lee-dohm/markdown-helper.svg)](https://travis-ci.org/lee-dohm/markdown-helper)
[![Package Version](https://img.shields.io/apm/v/markdown-helper.svg)](https://atom.io/packages/markdown-helper)
[![Package Downloads](https://img.shields.io/apm/dm/markdown-helper.svg)](https://atom.io/packages/markdown-helper)

A collection of simple utilities for working with Markdown files.

## Utilities

Because no keybindings are created for any of these out of the box, each utility is identified only by its command name. The command name is listed at the top of the description of what the utility does.

### Convert Inline Links into Reference Links

**Command:** `markdown-helper:convert-to-reference-links`

In Markdown, there are two ways to type links into a document: inline links and reference links. Inline links include the URL immediately after the link text and reference links refer to the URL in another location in the document. Reference links generally keep the document tidier, but they are harder to keep track of. This utility allows one to type in the links in the inline format and then automatically generate the reference format from them.

### Insert Reference Link

**Command:** `markdown-helper:insert-link`

Opens a dialog asking for a title and a target. The title is the text that will be linked from and the target is the URL that will be linked to. When confirmed, it will insert a reference link at the current cursor position and add the reference at the end of the file.

### Tidy Up By Deleting Repeated Blank Lines

**Command:** `markdown-helper:tidy`

I like to have single blank lines between blocks of text in Markdown. Having more than one blank line can be distracting. This cleans up any series of more than one blank line.

## Copyright

Copyright &copy; 2016-2017 by [Lee Dohm](http://www.lee-dohm.com). See [LICENSE](https://raw.githubusercontent.com/lee-dohm/package-name/master/LICENSE.md) for details.
