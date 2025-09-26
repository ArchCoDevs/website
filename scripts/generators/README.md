# Generators

Generators are node scripts used to automatically generate files which are commonly
used in the project. For example, automatically generating a new icon component in
the icon library when a new SVG icon is added to the `/public/icons`
directory.

All generators also have a `--watch` option which will watch for changes to the
files they generate and automatically regenerate them. If you are running one of the
`devkit` scripts, all watchers will be started automatically.
