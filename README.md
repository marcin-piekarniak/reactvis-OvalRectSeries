# reactvis-OvalRectSeries
Example usage(junk code)
```
import { HorizontalOvalRectSeries, VerticalOvalRectSeries } from "app/shared/ovalRectSeries";
 
// EXAMPLE DATA

 private graph2GetRects() {
        const result = this.props.data.map((entry: any, index: number) => {
            return {
                color:
                    (entry.name === (this.state.valueGraph2 ? this.state.valueGraph2.name : null)) ?
                        "#00BBD6" : "#7F869B",
                currency: entry.contributions[0].currency,
                dayEnd: entry.dayEnd,
                dayStart: entry.dayStart,
                monthEnd: entry.monthEnd,
                monthStart: entry.monthStart,
                name: entry.name,
                value: entry.contributions.reduce((acc: any, {value}: any) => {
                    return acc += value;
                }, 0),
                x: entry.yearEnd + 0.9,
                x0: entry.yearStart + 0.1,
                y: index + 0.65,
                y0: index + 0.35,
                yearEnd: entry.yearEnd,
                yearStart: entry.yearStart,
           };
        });
        return result;
    }

// IN RENDER

    return (
      <XYPlot
          height={height}
          width={len * Math.floor(width / len)}
          xDomain={[this.props.yearStart, this.props.yearEnd + 1]}
          yDomain={[graph2Rects.length, 0]}
          margin={{left: 0, right: 0, top: 10, bottom: 10}}
      >

            <HorizontalOvalRectSeries
                data={graph2Rects}
                onValueMouseOver={rememberValueGraph2}
                onValueMouseOut={forgetValueGraph2}
                colorType="literal"
            />
             {this.state.valueGraph2 ? this.renderGraph2Hint() : null}
      </XYPlot>
  );
```
