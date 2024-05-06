import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import collegeMapImage from "../maps/gcekmap.jpg"; // Import your image file

const CollegePlan = () => {
  const svgRef = useRef();

  const [data, setData] = useState({
    nodes: [
      { id: "Main Gate", x: 43, y: 296 },
      { id: "Front Gate", x: 112, y: 250 },
      { id: "Canteen", x: 138, y: 274 },
      { id: "Flag Post", x: 172, y: 287 },
      { id: "Civil Lab", x: 172, y: 242 },
      { id: "Cooperative Store", x: 112, y: 250 },
      { id: "Cooperative Store", x: 112, y: 250 }
    ],
    links: [
      { source: "Main Gate", target: "Front Gate", weight: 1 }
    ]
  });

  const [fromNode, setFromNode] = useState("");
  const [toNode, setToNode] = useState("");
  const [shortestPath, setShortestPath] = useState([]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    svg.append("image")
    .attr("href", collegeMapImage) // Set the image source
    .attr("width", 343)
    .attr("height", 573)
    .attr("x", 0) // Align image to the left
   // .attr("y", 0); // Align image to the top

    // Render nodes
    const nodeElements = svg
      .selectAll(".node")
      .data(data.nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 10); // Adjust node size as needed

    // Render links
    const links = svg
      .selectAll(".link")
      .data(data.links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("x1", (d) => getNodePosition(d.source, "x"))
      .attr("y1", (d) => getNodePosition(d.source, "y"))
      .attr("x2", (d) => getNodePosition(d.target, "x"))
      .attr("y2", (d) => getNodePosition(d.target, "y"))
      .attr("stroke-width", 2);

    // Highlight shortest path
    svg.selectAll(".link")
      .filter((d) => shortestPath.includes(d.source) && shortestPath.includes(d.target))
      .attr("stroke", "red"); // You can adjust the color as needed

    // Append text elements for edge weights
    svg.selectAll(".edge-weight")
      .data(data.links)
      .enter()
      .append("text")
      .attr("class", "edge-weight")
      .attr("x", (d) => (getNodePosition(d.source, "x") + getNodePosition(d.target, "x")) / 2)
      .attr("y", (d) => (getNodePosition(d.source, "y") + getNodePosition(d.target, "y")) / 2)
      .text((d) => d.weight)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle");

    function getNodePosition(nodeId, axis) {
      const node = data.nodes.find((n) => n.id === nodeId);
      return axis === "x" ? node.x : node.y;
    }
  }, [data, shortestPath]);

  const dijkstra = (graph, start, end) => {
    const shortestDistances = {};
    const predecessorNodes = {};
    const unseenNodes = Object.keys(graph);

    unseenNodes.forEach((node) => {
      shortestDistances[node] = Infinity;
    });
    shortestDistances[start] = 0;

    while (unseenNodes.length > 0) {
      let currentNode = null;

      unseenNodes.forEach((node) => {
        if (
          currentNode === null ||
          shortestDistances[node] < shortestDistances[currentNode]
        ) {
          currentNode = node;
        }
      });

      const neighborNodes = Object.keys(graph[currentNode]);

      neighborNodes.forEach((neighborNode) => {
        const distance =
          shortestDistances[currentNode] + graph[currentNode][neighborNode];

        if (distance < shortestDistances[neighborNode]) {
          shortestDistances[neighborNode] = distance;
          predecessorNodes[neighborNode] = currentNode;
        }
      });

      unseenNodes.splice(unseenNodes.indexOf(currentNode), 1);
    }

    let currentNode = end;
    const path = [];
    while (currentNode !== start) {
      path.unshift(currentNode);
      currentNode = predecessorNodes[currentNode];
    }
    path.unshift(start);

    return path;
  };

  const handleShortestPath = () => {
    if (!fromNode || !toNode) {
      alert("Please enter both 'from' and 'to' node labels.");
      return;
    }

    const graph = {};
    data.nodes.forEach((node) => {
      graph[node.id] = {};
    });
    data.links.forEach((link) => {
      graph[link.source][link.target] = link.weight;
      graph[link.target][link.source] = link.weight; // Bidirectional edge
    });

    const path = dijkstra(graph, fromNode, toNode);

    // Remove existing shortest path
    const svg = d3.select(svgRef.current);
    svg.selectAll(".link").remove();

    // Update the stroke color of links in the shortest path
    const updatedLinks = data.links.map((link) => ({
      ...link,
      stroke: shortestPath.includes(link.source) && shortestPath.includes(link.target) ? "red" : "black"
    }));

    setShortestPath(path);
    setData((prevData) => ({
      ...prevData,
      links: updatedLinks,
    }));
  };

  return (
    <div>
      <svg ref={svgRef} width={600} height={500}></svg>
      <div>
        <label htmlFor="from">From:</label>
        <input
          type="text"
          id="from"
          value={fromNode}
          onChange={(e) => setFromNode(e.target.value)}
        />
        <label htmlFor="to">To:</label>
        <input
          type="text"
          id="to"
          value={toNode}
          onChange={(e) => setToNode(e.target.value)}
        />
        <button onClick={handleShortestPath}>Find Shortest Path</button>
      </div>
      <div>
        {shortestPath.length > 0 && (
          <p>Shortest path: {shortestPath.join(" -> ")}</p>
        )}
      </div>
    </div>
  );
};

export default CollegePlan;
