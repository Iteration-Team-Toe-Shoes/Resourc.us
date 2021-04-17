import React from "react";
import { ResponsiveSunburst } from "@nivo/sunburst";

const SunBurstChart = ({data}) => {
  return (
    <ResponsiveSunburst
      data={data}
      margin={{ top: 40, right: 20, bottom: 20, left: 20 }}
      id="name"
      value="loc"
      cornerRadius={2}
      borderWidth={1}
      borderColor="white"
      colors={{ scheme: "nivo" }}
      childColor={{ from: "color" }}
      animate={false}
      motionConfig="gentle"
      isInteractive={true}
    />
  );
};

export {SunBurstChart};