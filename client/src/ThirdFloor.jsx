import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import collegeMapImage from "../maps/college-map-image.jpg"; // Import your image file

const CollegePlan = () => {
  const svgRef = useRef();

  const [data, setData] = useState({
    nodes: [
      { id: "classroom1", x: 125, y: 376 },
      { id: "classroom2", x: 125, y: 300 },
      { id: "officeA", x: 500, y: 150 },
      { id: "officeB", x: 300, y: 300 },
      { id: "library", x: 300, y: 450 },
      { id: "class1", x: 125, y: 378 },
      { id: "class2", x: 124, y: 301 },
      { id: "class3", x: 124, y: 226 },
      { id: "class4", x: 125, y: 153 },
      { id: "class5", x: 124, y: 100 },
      { id: "class6", x: 116, y: 77 },
      { id: "class7", x: 32, y: 78 },
      { id: "class8", x: 282, y: 76 },
      { id: "class9", x: 283, y: 122 },
      { id: "class10", x: 285, y: 170 },
      { id: "class11", x: 284, y: 221 },
      { id: "class12", x: 284, y: 318 },
      { id: "class13", x: 283, y: 371 },
      { id: "class14", x: 284, y: 435 },
      { id: "class15", x: 453, y: 75 },
      { id: "class16", x: 482, y: 78 },
      { id: "class17", x: 482, y: 101 },
      { id: "class18", x: 483, y: 153 },
      { id: "class19", x: 483, y: 229 },
      { id: "class20", x: 485, y: 304 },
      { id: "class21", x: 487, y: 378 },
      { id: "class22", x: 486, y: 429 }
    ],
    links: [
      { source: "classroom1", target: "classroom2", weight: 1 },
      { source: "classroom2", target: "officeA", weight: 2 },
      { source: "officeA", target: "officeB", weight: 3 },
      { source: "officeB", target: "library", weight: 4 },
      { source: "library", target: "classroom1", weight: 1 },
      // Manually added links
      { source: "class1", target: "class2", weight: 1 },
      { source: "class2", target: "class3", weight: 1 },
      { source: "class3", target: "class4", weight: 1 },
      { source: "class4", target: "class5", weight: 1 },
      { source: "class5", target: "class6", weight: 1 },
      { source: "class6", target: "class7", weight: 1 },
      { source: "class6", target: "class8", weight: 1 },
      { source: "class8", target: "class9", weight: 1 },
      { source: "class9", target: "class10", weight: 1 },
      { source: "class10", target: "class11", weight: 1 },
      { source: "class11", target: "class12", weight: 1 },
      { source: "class12", target: "class13", weight: 1 },
      { source: "class13", target: "class14", weight: 1 },
      { source: "class8", target: "class15", weight: 1 },
      { source: "class15", target: "class16", weight: 1 },
      { source: "class16", target: "class17", weight: 1 },
      { source: "class17", target: "class18", weight: 1 },
      { source: "class18", target: "class19", weight: 1 },
      { source: "class19", target: "class20", weight: 1 },
      { source: "class20", target: "class21", weight: 1 },
      { source: "class21", target: "class22", weight: 1 }
    ]
  });

  const [fromNode, setFromNode] = useState("");
  const [toNode, setToNode] = useState("");
  const [shortestPath, setShortestPath] = useState([]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Append the image as the background
    svg.append("image")
      .attr("href", collegeMapImage) // Set the image source
      .attr("width", 600)
      .attr("height", 500);

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
