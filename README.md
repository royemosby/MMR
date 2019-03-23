# Resume website for Maggie Lynn

- [ ] Base tooling
  - [X] Styling
  - [X] Includes
  - [ ] JS modules (site specific, page specific)
- [X] Thematic presets
- [ ] Block base mobile
- [ ] Nav
- [ ] Footer
- [ ] Index/about
- [ ] Resume
- [ ] Projects

## References

- [gulp for scss](https://github.com/josephdyer/skeleventy/)

## development

to run live dev environment run:

```shell
gulp watch & eleventy --serve
```

These are running separately and only eleventy logs on rebuild. If one build process fails, the other continues running. To stop it, make a save on a SCSS file. Gulp will show back up like toad under a rock. When it takes back the terminal, it can be `^C`ed out of.
