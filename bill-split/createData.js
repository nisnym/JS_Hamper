function createData() {
    const sz = Math.floor(Math.random() * 8) + 2; // [2 <= sz <= 9]

    // Adding People To Nodes Array
    let nodes = [];
    for(let i=1; i<=sz; i++){
        nodes.push({id : i, label : "Person " + i});
    }
    nodes = new vis.DataSet(nodes);

    // Dynamically Creating Edges With Random Amount 
    // To Be Paid From One To Another Friend
    const edges = [];
    for(let i=1; i<=sz; i++) {
        for(let j=i+1; j<=sz; j++) {
            // Modifies The Amount of Edges Added in the Graph
            if(Math.random() > 0.5) {
                // Controls the Direction of Cash Flow on Edge ( i -> j on > 0.5) and ( j -> i on <= 0.5)
                if(Math.random() > 0.5) {
                    edges.push({from : i, to : j, label : String(Math.floor(Math.random() * 100) + 1)}); // 1 <= val <= 100
                } else {
                    edges.push({from : j, to : i, label : String(Math.floor(Math.random() * 100) + 1)}); // 1 <= val <= 100
                }
            }
        }
    }
    const data = {
        nodes : nodes,
        edges : edges
    };
    return data;
}