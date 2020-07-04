export function pagingParse({column, dir}) {
  return (req, res, next) => {
    let page;
    let size;
    let order;

    try {
      page = parseInt(req.query.page, 10);
      if (Number.isNaN(page)) {
        page = 1;
      }
    } catch (ignore) {
      page = 1;
    }

    try {
      size = parseInt(req.query.size, 10);
      if (Number.isNaN(size)) {
        size = 10;
      }
    } catch (ignore) {
      size = 10;
    }

    if (!req.query.sort) {
      if (column && dir) {
        order = [
          [column, dir]
        ];
      }
    } else {
      order = [];
      const [_column, _dir] = req.query.sort.split(':');
      order.push([_column, _dir]);
    }

    req.paging = {
      page, size, order,
      limit: size,
      offset: (page - 1) * size
    };
    next();
  };
}
