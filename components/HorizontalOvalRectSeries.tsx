import React from "react";
import { OvalRectSeries } from "./OvalRectSeries";
import { AbstractSeries, HorizontalRectSeriesProps } from "react-vis";

export class HorizontalOvalRectSeries extends AbstractSeries<HorizontalRectSeriesProps> {
    public getParentConfig(attr: any) {
        const isDomainAdjustmentNeeded = false;
        const zeroBaseValue = attr === "x";
        return {
            isDomainAdjustmentNeeded,
            zeroBaseValue,
        };
    }

    public render() {
        return (
            <OvalRectSeries
                {...this.props}
                linePosAttr="y"
                valuePosAttr="x"
                lineSizeAttr="height"
                valueSizeAttr="width"
            />
        );
    }
}
