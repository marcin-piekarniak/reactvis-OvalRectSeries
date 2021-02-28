// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

// modified rect series from react-vis to have ovality
import React from "react";
import { AbstractSeries, RectSeriesProps } from "react-vis";
import Animation from "animation";
const predefinedClassName = "rv-xy-plot__series rv-xy-plot__series--rect";

const ANIMATED_SERIES_PROPS = [
    "xRange",
    "xDomain",
    "x",
    "yRange",
    "yDomain",
    "y",
    "colorRange",
    "colorDomain",
    "color",
    "opacityRange",
    "opacityDomain",
    "opacity",
    "strokeRange",
    "strokeDomain",
    "stroke",
    "fillRange",
    "fillDomain",
    "fill",
    "width",
    "height",
    "marginLeft",
    "marginTop",
    "marginRight",
    "marginBottom",
    "data",
    "angleDomain",
    "angleRange",
    "angle",
    "radiusDomain",
    "radiusRange",
    "radius",
    "innerRadiusDomain",
    "innerRadiusRange",
    "innerRadius",
];

export class OvalRectSeries extends AbstractSeries<RectSeriesProps> {
    public render(): any {
        const {
            animation,
            className,
            data,
            linePosAttr,
            lineSizeAttr,
            marginLeft,
            marginTop,
            style,
            valuePosAttr,
            valueSizeAttr,
        } = this.props;

        if (!data) {
            return null;
        }

        if (animation) {
            return (
                <Animation {...this.props} animatedProps={ANIMATED_SERIES_PROPS}>
                    <OvalRectSeries {...this.props} animation={null} />
                </Animation>
            );
        }

        const lineFunctor = this._getAttributeFunctor(linePosAttr);
        const line0Functor = this._getAttr0Functor(linePosAttr);
        const valueFunctor = this._getAttributeFunctor(valuePosAttr);
        const value0Functor = this._getAttr0Functor(valuePosAttr);
        const fillFunctor =
        this._getAttributeFunctor("fill") || this._getAttributeFunctor("color");
        const strokeFunctor =
        this._getAttributeFunctor("stroke") || this._getAttributeFunctor("color");
        const opacityFunctor = this._getAttributeFunctor("opacity");

        return (
            <g
                className={`${predefinedClassName} ${className}`}
                transform={`translate(${marginLeft},${marginTop})`}
            >
                {data.map((d, i) => {
                    const attrs = {
                        onClick: (e: any) => this._valueClickHandler(d, e),
                        onContextMenu: (e: any) => this._valueRightClickHandler(d, e),
                        onMouseOut: (e: any) => this._valueMouseOutHandler(d, e),
                        onMouseOver: (e: any) => this._valueMouseOverHandler(d, e),
                        style: {
                            fill: fillFunctor && fillFunctor(d),
                            opacity: opacityFunctor && opacityFunctor(d),
                            stroke: strokeFunctor && strokeFunctor(d),
                            ...style,
                        },
                    };
                    attrs[linePosAttr] = line0Functor(d);
                    attrs[lineSizeAttr] = Math.abs(lineFunctor(d) - line0Functor(d));
                    attrs[valuePosAttr] = Math.min(value0Functor(d), valueFunctor(d));
                    attrs[valueSizeAttr] = Math.abs(-value0Functor(d) + valueFunctor(d));
                    return <rect key={i} {...attrs} rx="2" ry="2" />;
                })}
            </g>
        );
    }
}
