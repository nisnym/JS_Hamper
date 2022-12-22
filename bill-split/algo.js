import { BinaryHeap } from "./heap.js";

function solveData(data) {
  const sz = data["nodes"].length;
  const vals = Array(sz).fill(0);
  for (let i = 0; i < data["edges"].length; i++) {
    const edge = data["edges"][i];
    vals[edge["to"] - 1] += parseInt(edge["label"]);
    vals[edge["from"] - 1] += parseInt(edge["label"]);
  }

  const neg_heap = new BinaryHeap();
  const pos_heap = new BinaryHeap();

  for (let i = 0; i < sz; i++) {
    if (vals[i] > 0) {
      pos_heap.insert([vals[i], i]);
    } else if (vals[i] < 0) {
      neg_heap.insert([-vals[i], i]);
      vals[i] *= -1;
    }
  }

  const new_edges = [];
  while (!pos_heap.empty() && !neg_heap.empty()) {
    const mx = pos_heap.extractMax();
    const mn = neg_heap.extractMax();
    const amt = Math.min(mx[0], mn[0]);
    const to = mx[1];
    const from = mn[1];
    new_edges.push({ from: from + 1, to: to + 1, label: String(amt) });
    vals[to] -= amt;
    vals[from] -= amt;

    if (mx[0] > mn[0]) {
      pos_heap.insert([vals[to], to]);
    } else if (mx[0] < mn[0]) {
      neg_heap.insert([vals[from], from]);
    }
  }
  data = {
      nodes: data['nodes'],
      edges: new_edges
  };
  return data;
}
