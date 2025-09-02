# @slatecss/grid

```scss
@use "@slatecss/grid" as grid;

.container {
  @include grid.matrix(3);
  @include grid.gap("2");
}

.item {
  @include grid.col-span(2);
}
```
