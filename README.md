# media-tracker

## entry data
{
  id,
  cover,
  type,
  name,
  score,
  handlerID,
  counts: {
    seen,
    out,
  },
  time: {
    created,
    modified,
    seen,
    out,
  },
  handlers: {
    [handlerId]: {
      data,
      time: {
        checked,
        modified,
      },
    },
  },
}

## mvp
- [x] switch to a list view
- [ ] button to increase counts.seen
- [ ] nyaa handler
- [ ] links to new releases
- [ ] handlers increasing counts.out
- [ ] splitting counts into numbers