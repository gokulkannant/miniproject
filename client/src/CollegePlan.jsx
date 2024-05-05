import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const CollegePlan = () => {
  const svgRef = useRef();
  const [links, setLinks] = useState([]);

  const data = {
    nodes: [
      { id: "classroom1", x: 100, y: 150 },
      { id: "classroom2", x: 300, y: 150 },
      { id: "officeA", x: 500, y: 150 },
      { id: "officeB", x: 300, y: 300 },
      { id: "library", x: 300, y: 450 }
    ],
    links: [
      { source: "classroom1", target: "classroom2", color: "black", weight: 1 },
      { source: "classroom2", target: "officeA", color: "black", weight: 2 },
      { source: "officeA", target: "officeB", color: "black", weight: 3 },
      { source: "officeB", target: "library", color: "black", weight: 4 },
      { source: "library", target: "classroom1", color: "black", weight: 5 }
    ]
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Render nodes (circles)
    svg
      .selectAll(".node")
      .data(data.nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 10); // Adjust node size

    // Render links (lines)
    const linkElements = svg
      .selectAll(".link")
      .data(data.links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("x1", (d) => getNodePosition(d.source, 'x'))
      .attr("y1", (d) => getNodePosition(d.source, 'y'))
      .attr("x2", (d) => getNodePosition(d.target, 'x'))
      .attr("y2", (d) => getNodePosition(d.target, 'y'))
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 2);

    setLinks(linkElements);

    // Function to get node position by ID
    function getNodePosition(nodeId, axis) {
      const node = data.nodes.find(n => n.id === nodeId);
      return axis === 'x' ? node.x : node.y;
    }
  }, [data]);

  // Dijkstra's algorithm to find shortest path
  const dijkstra = (graph, start, end) => {
    const shortestDistances = {};
    const predecessorNodes = {};
    const unseenNodes = Object.keys(graph);

    unseenNodes.forEach(node => {
      shortestDistances[node] = Infinity;
    });
    shortestDistances[start] = 0;

    while (unseenNodes.length > 0) {
      let currentNode = null;

      unseenNodes.forEach(node => {
        if (currentNode === null || shortestDistances[node] < shortestDistances[currentNode]) {
          currentNode = node;
        }
      });

      const neighborNodes = Object.keys(graph[currentNode]);

      neighborNodes.forEach(neighborNode => {
        const distance = shortestDistances[currentNode] + graph[currentNode][neighborNode];

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

  // Function to handle input and find shortest path
  const handleShortestPath = (source, target) => {
    const graph = {};
    data.nodes.forEach(node => {
      graph[node.id] = {};
    });
    data.links.forEach(link => {
      graph[link.source][link.target] = link.weight;
    });

    const path = dijkstra(graph, source, target);

    const updatedLinks = data.links.map(link => ({
      ...link,
      color: path.includes(link.source) && path.includes(link.target) ? 'red' : 'black'
    }));

    setLinks(updatedLinks);
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const linkElements = svg.selectAll(".link");

    linkElements
      .data(links)
      .attr("stroke", d => d.color);
  }, [links]);

  return (
    <div>
      <svg ref={svgRef} width={600} height={500}></svg>
      <div>
        <button onClick={() => handleShortestPath("classroom1", "library")}>Find Shortest Path</button>
      </div>
    </div>
  );
};

export default CollegePlan;
