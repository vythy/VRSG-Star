const laneToPos = {
    1: -0.0525,
    2: -0.0165,
    3: 0.017,
    4: 0.054
}

const parseMap = (map) => {
    const reader = new FileReader()

    let mapData = []

    let initZ = 0
    let lastHitTime = 0

    reader.onload = (event) => {
        const file = event.target.result
        const allLines = file.split(/\r\n|\n/);

        allLines.forEach((line) => {
            const data = line.split(",")
            let lane = 4

            if (data[0] <= 64) lane = 1;
            if (data[0] <= 192) lane = 2;
            if (data[0] <= 320) lane = 3;

            initPos = new THREE.Vector3(laneToPos[lane], 0, initZ)
            
            mapData.push([initPos, lane, data[2]])

            if (data[2] != lastHitTime) {
                lastHitTime = data[2]
                if (initZ != 0) initZ -= 0.05;
            }
        });
    }

    return mapData;
}

export default parseMap;