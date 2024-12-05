export function arrayToMap<Item, Key extends string | number, Value = Item>(
  items: readonly Item[],
  keyFunction: (item: Item) => Key,
  valueFunction: (item: Item) => Value = (item) => item as unknown as Value,
): Map<Key, Value> {
  return new Map(items.map((item) => [keyFunction(item), valueFunction(item)]));
}

export function arrayToMultiMap<
  Item,
  Key extends string | number,
  Value = Item,
>(
  items: readonly Item[],
  keyFunction: (item: Item) => Key,
  valueFunction: (item: Item) => Value = (item) => item as unknown as Value,
): Map<Key, Value[]> {
  return items.reduce((map, item) => {
    const key = keyFunction(item);
    let values = map.get(key);

    if (values === undefined) {
      values = [];
      map.set(key, values);
    }

    values.push(valueFunction(item));
    return map;
  }, new Map<Key, Value[]>());
}
