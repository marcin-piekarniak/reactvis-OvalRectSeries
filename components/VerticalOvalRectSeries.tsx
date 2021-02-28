import React from "react";
import { OvalRectSeries } from "./OvalRectSeries";
import { AbstractSeries, VerticalRectSeriesProps } from "react-vis";

export class VerticalOvalRectSeries extends AbstractSeries<VerticalRectSeriesProps> {
    public getParentConfig(attr: any) {
        const isDomainAdjustmentNeeded = false;
        const zeroBaseValue = attr === "y";
        return {
            isDomainAdjustmentNeeded,
            zeroBaseValue,
        };
    }

    public render() {
        return (
            <OvalRectSeries
                {...this.props}
                linePosAttr="x"
                valuePosAttr="y"
                lineSizeAttr="width"
                valueSizeAttr="height"
            />
        );
    }
}
