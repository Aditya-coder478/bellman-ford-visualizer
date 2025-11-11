document.getElementById('run').addEventListener('click', () => {
  const edgesText = document.getElementById('edges').value.trim();
  const source = parseInt(document.getElementById('source').value);
  const output = document.getElementById('output');
  if (!edgesText || isNaN(source)) {
    output.innerHTML = '<p style="color:red;">Please enter valid input.</p>';
    return;
  }

  const edges = edgesText.split('\n').map(line => line.split(' ').map(Number));
  const vertices = new Set(edges.flat().filter((_, i) => i % 3 !== 2));
  const V = vertices.size;
  const dist = Array(V).fill(Infinity);
  dist[source] = 0;

  for (let i = 0; i < V - 1; i++) {
    for (const [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }

  let negativeCycle = false;
  for (const [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      negativeCycle = true;
      break;
    }
  }

  output.innerHTML = negativeCycle
    ? '<p style="color:red;">Graph contains negative weight cycle!</p>'
    : '<h3>Shortest Distances from Source ' + source + ':</h3>' + dist.map((d, i) => `<p>Vertex ${i}: ${d}</p>`).join('');
});
