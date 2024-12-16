class Graph<T extends string> {
  private adjacencyList: Map<T, Map<T, number>> = new Map<T, Map<T, number>>();

  constructor() {}

  addVertex = (vertexKey: T) => {
    if (!this.adjacencyList.has(vertexKey)) {
      this.adjacencyList.set(vertexKey, new Map<T, number>());
    }
  };

  addEdge = (vertexKey1: T, vertexKey2: T, weight: number) => {
    const edge = this.adjacencyList.get(vertexKey1);

    if (edge !== undefined) {
      edge.set(vertexKey2, weight);
    } else {
      this.adjacencyList.set(
        vertexKey1,
        new Map<T, number>([[vertexKey2, weight]]),
      );
    }
  };

  djikstra(
    start: T,
    end: T,
    getNeighbors: (nodeKey: T) => Map<T, number> | undefined,
  ) {
    const explored = new Set<T>();
    const frontier = new PriorityQueue<T>();
    const previous = new Map<T, T>();

    const path = [];
    let totalCost = 0;

    // if (!this.adjacencyList.has(start)) {
    //   throw new Error("Start node not added to graph" + start);
    // }

    // Add the starting point to the frontier, it will be the first node visited
    frontier.set(start, 0);

    // Run until we have visited every node in the frontier
    while (!frontier.isEmpty()) {
      // Get the node in the frontier with the lowest cost (`priority`)
      const node = frontier.next() as {
        key: T;
        priority: number;
      };

      // When the node with the lowest cost in the frontier in our goal node,
      // we can compute the path and exit the loop
      if (node.key.split("|")[0] === end) {
        // Set the total cost to the current value
        totalCost = node.priority;

        let nodeKey = node.key;
        while (previous.has(nodeKey)) {
          path.push(nodeKey);
          nodeKey = previous.get(nodeKey) as T;
        }

        break;
      }

      // Add the current node to the explored set
      explored.add(node.key);

      // Loop all the neighboring nodes
      const neighbors = getNeighbors(node.key) || new Map<T, number>();
      neighbors.forEach((nCost, nNode) => {
        // If we already explored the node, or the node is to be avoided, skip it
        if (explored.has(nNode)) return null;

        // If the neighboring node is not yet in the frontier, we add it with
        // the correct cost
        if (!frontier.has(nNode)) {
          previous.set(nNode, node.key);
          return frontier.set(nNode, node.priority + nCost);
        }

        const frontierNode = frontier.get(nNode) as {
          key: T;
          priority: number;
        };
        const frontierPriority = frontierNode.priority;
        const nodeCost = node.priority + nCost;

        // Otherwise we only update the cost of this node in the frontier when
        // it's below what's currently set
        if (nodeCost < frontierPriority) {
          previous.set(nNode, node.key);
          return frontier.set(nNode, nodeCost);
        }

        return null;
      });
    }

    return {
      path,
      cost: totalCost,
    };
  }
}

/**
 * This very basic implementation of a priority queue is used to select the
 * next node of the graph to walk to.
 *
 * The queue is always sorted to have the least expensive node on top.
 * Some helper methods are also implemented.
 *
 * You should **never** modify the queue directly, but only using the methods
 * provided by the class.
 */
class PriorityQueue<T extends string | number> {
  private keys: Set<T>;
  private queue: {
    key: T;
    priority: number;
  }[];

  /**
   * Creates a new empty priority queue
   */
  constructor() {
    // The `keys` set is used to greatly improve the speed at which we can
    // check the presence of a value in the queue
    this.keys = new Set<T>();
    this.queue = [];
  }

  /**
   * Sort the queue to have the least expensive node to visit on top
   */
  private sort() {
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  /**
   * Sets a priority for a key in the queue.
   * Inserts it in the queue if it does not already exists.
   */
  set(key: T, priority: number) {
    if (!this.keys.has(key)) {
      this.keys.add(key);
      this.queue.push({ key, priority });
    } else {
      this.queue.map((element) => {
        if (element.key === key) {
          Object.assign(element, { priority });
        }

        return element;
      });
    }

    // Can optimize insertion

    this.sort();
    return this.queue.length;
  }

  /**
   * The next method is used to dequeue a key:
   * It removes the first element from the queue and returns it
   */
  next() {
    const element = this.queue.shift();

    if (element !== undefined) {
      // Remove the key from the `_keys` set
      this.keys.delete(element.key);
    }

    return element;
  }

  /**
   * Returns `true` when the queue is empty
   */
  isEmpty() {
    return this.queue.length === 0;
  }

  /**
   * Check if the queue has a key in it
   */
  has(key: T) {
    return this.keys.has(key);
  }

  /**
   * Get the element in the queue with the specified key
   */
  get(key: T) {
    return this.queue.find((element) => element.key === key);
  }
}

export const createEmptyGraph = <T extends string | number>() => {
  return new Graph<T>();
};
