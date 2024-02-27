# media-tracker

## entry data
{
  id: int,
  cover: string,
  type: string,
  handlerKey: [handlerKey],
  name: string,
  creator: string,
  language: langKey,
  status: statusKey,
  score: float,
  note: string, // TODO
  links: { // TODO
    targetKey: url,
  },
  counts: {
    seen: string,
    out: string,
  },
  time: { // TODO
    created: timestamp,
    modified: timestamp,
    seen: timestamp,
    out: timestamp,
  },
  handlers: { // TODO
  [handlerKey: {
      data: json,
      time: {
        checked: timestamp,
        modified: timestamp,
      },
    },
  },
}

## todo
- [x] switch to a list view
- [x] add necessary data to entries
- [x] button to increase counts.seen
- [ ] nyaa handler
- [ ] links to new releases
- [ ] handlers increasing counts.out
- [ ] handle filtering and searching

## bugs
- [ ] pressing enter int the EntryEditor should confirm the edit
- [ ] allow closing a select input with the escape key
- [ ] allow canceling deletion with the escape key