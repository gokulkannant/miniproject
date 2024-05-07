import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import collegeMapImage from "../maps/gcekmap.jpg"; // Import your image file
import './CollegePlan.css'

const CollegePlan = () => {
  const svgRef = useRef();

  const [data, setData] = useState({
    nodes: [
      { id: "Main Gate", x: 43, y: 296 },
      { id: "Front Gate", x: 112, y: 250 },
      { id: "Canteen", x: 138, y: 274 },
      {id: "Cooperative Store", x: 148, y: 285 },
      {id: "Junction", x: 158, y: 292 },
      { id: "Flag Post", x: 158, y: 294 },
      { id: "Old Library", x: 175, y: 287 },
      { id: "Civil Lab", x: 175, y: 266 },
      { id: "D Block", x: 175, y: 242 },
      { id: "Bus Gate", x: 182, y: 195 },
      { id: "Main Block", x: 158, y: 317 },
      { id: "Ground", x: 158, y: 343 },
      { id: "Library", x: 180, y: 343 },
      { id: "Lab", x: 204, y: 343 },
      { id: "Main Block Ramp", x: 204, y: 317 },
      { id: "Back Gate", x: 149, y: 382 },
      { id: "Turning", x: 204, y: 291 },
      { id: "PG Block", x: 204, y: 404 },
      { id: "Auditorium", x: 180, y: 398 },
      { id: "MH", x: 285, y: 117 },
      { id: "a", x: 87, y: 241 },
      { id: "LH", x: 75, y: 164 },
    ],
    links: [
      { source: "Main Gate", target: "Front Gate", weight: 3 },
      { source: "Front Gate", target: "Canteen", weight: 1 },
      { source: "Canteen", target: "Cooperative Store", weight: 1 },
      { source: "Cooperative Store", target: "Junction", weight: 1 },
      { source: "Junction", target: "Flag Post", weight: 1 },
      { source: "Flag Post", target: "Old Library", weight: 1 },
      { source: "Old Library", target: "Civil Lab", weight: 1 },
      { source: "Civil Lab", target: "D Block", weight: 1 },
      { source: "D Block", target: "Bus Gate", weight: 1 },
      { source: "Junction", target: "Main Block", weight: 1 },
      { source: "Main Block", target: "Ground", weight: 1 },
      { source: "Ground", target: "Library", weight: 1 },
      { source: "Ground", target: "Back Gate", weight: 1 },
      { source: "Library", target: "Lab", weight: 1 },
      { source: "Lab", target: "Main Block Ramp", weight: 1 },
      { source: "Main Block Ramp", target: "Turning", weight: 1 },
      { source: "Turning", target: "Flag Post", weight: 1 },
      { source: "Lab", target: "PG Block", weight: 1 },
      { source: "PG Block", target: "Auditorium", weight: 1 },
      { source: "Back Gate", target: "Auditorium", weight: 1 },
      { source: "Back Gate", target: "Main Gate", weight: 5 },
      { source: "Bus Gate", target: "MH", weight: 1 },
      { source: "Front Gate", target: "a", weight: 1 },
      { source: "Main Gate", target: "a", weight: 2.5 },
      { source: "a", target: "LH", weight: 1 },
     // { source: "Main Gate", target: "Bus Gate", weight: 1 },
      { source: "Front Gate", target: "Bus Gate", weight: 1 },
      { source: "Front Gate", target: "a", weight: 1 },
      { source: "Front Gate", target: "Bus Gate", weight: 1 },
    ]
  });

  const [fromNode, setFromNode] = useState("");
  const [toNode, setToNode] = useState("");
  const [shortestPath, setShortestPath] = useState([]);
  const [allNodeLabels, setAllNodeLabels] = useState([]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
  
    svg.append("image")
      .attr("href", collegeMapImage)
      .attr("width", 343)
      .attr("height", 573)
      .attr("x", 0);
  
    // Render nodes
    const nodeElements = svg
      .selectAll(".node")
      .data(data.nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 1);
  
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
      .attr("stroke-width", (d) =>
        shortestPath.includes(d.source) && shortestPath.includes(d.target) ? 4 : 2
      );
  
    // Highlight shortest path
    svg.selectAll(".link")
      .filter((d) => shortestPath.includes(d.source) && shortestPath.includes(d.target))
      .attr("stroke", "blue")
      .attr("stroke-width", 6);
  
    // Append circles for start and end points of shortest path
    const shortestPathNodes = svg.selectAll(".shortest-path-node")
      .data(shortestPath)
      .enter()
      .append("circle")
      .attr("class", "shortest-path-node")
      .attr("cx", (d) => getNodePosition(d, "x"))
      .attr("cy", (d) => getNodePosition(d, "y"))
      .attr("r", 3)
      .attr("fill", "white");
  
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

  const handleFromNodeChange = (event) => {
    setFromNode(event.target.value);
  };

  const handleToNodeChange = (event) => {
    setToNode(event.target.value);
  };

  const handleFromNodeAutocomplete = (event) => {
    const input = event.target.value.toLowerCase();
    const filteredLabels = allNodeLabels.filter((label) =>
      label.toLowerCase().includes(input)
    );
    setFromNode(filteredLabels[0] || input);
  };

  const handleToNodeAutocomplete = (event) => {
    const input = event.target.value.toLowerCase();
    const filteredLabels = allNodeLabels.filter((label) =>
      label.toLowerCase().includes(input)
    );
    setToNode(filteredLabels[0] || input);
  };

  return (
    <div>


      <div className="colmap">
      <svg ref={svgRef} width={600} height={500}></svg>
      </div>


      <div>
        <label htmlFor="from">From:</label>
        <input
          type="text"
          id="from"
          value={fromNode}
          onChange={handleFromNodeChange}
          onInput={handleFromNodeAutocomplete}
        />
        <label htmlFor="to">To:</label>
        <input
          type="text"
          id="to"
          value={toNode}
          onChange={handleToNodeChange}
          onInput={handleToNodeAutocomplete}
        />

      <div className="showroute">
      <button onClick={handleShortestPath}>Show Route</button>
      </div>

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
