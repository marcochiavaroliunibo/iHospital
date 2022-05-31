import {ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ValueChart} from "../value-chart";
import * as d3 from "d3";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-chart-value',
  templateUrl: './chart-value.component.html',
  styleUrls: ['./chart-value.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartValueComponent implements OnChanges {

  @ViewChild('chart', {static: true})
  chartElement: ElementRef | undefined;
  @Input()
  valueChartStatus: ValueChart[] | undefined;
  private svgElement: HTMLElement | undefined;
  private chartProps: any;
  parseDate = d3.timeParse('%H:%M:%S');
  time: any;
  hr: number | undefined; press_min: number | undefined; press_max: number | undefined; freq_resp: number | undefined;

  constructor() { }

  buildChart() {
    this.chartProps = {};
    this.formatDate();


    // Set the dimensions of the canvas / graph
    var margin = { top: 30, right: 20, bottom: 30, left: 50 },
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

    // Set the ranges
    this.chartProps.x = d3.scaleTime().range([0, width]);
    this.chartProps.y = d3.scaleLinear().range([height, 0]);

    // Define the axes
    var xAxis = d3.axisBottom(this.chartProps.x);
    var yAxis = d3.axisLeft(this.chartProps.y).ticks(5);

    let _this = this;
    let y = 0;

    // Define the line
    var valueline = d3.line<ValueChart>()
        .x(function (d) {
          if (d.date instanceof Date) {
            return _this.chartProps.x(d.date.getTime());
          }
        })
        .y(function (d) { return _this.chartProps.y(d.hr); });

    var valueline2 = d3.line<ValueChart>()
        .x(function (d) {
          if (d.date instanceof Date) {
            return _this.chartProps.x(d.date.getTime());
          }
        })
        .y(function (d) { return _this.chartProps.y(d.press_min); });

    var valueline3 = d3.line<ValueChart>()
        .x(function (d) {
          if (d.date instanceof Date) {
            return _this.chartProps.x(d.date.getTime());
          }
        })
        .y(function (d) { return _this.chartProps.y(d.press_max); });

    var valueline4 = d3.line<ValueChart>()
        .x(function (d) {
          if (d.date instanceof Date) {
            return _this.chartProps.x(d.date.getTime());
          }
        })
        .y(function (d) { return _this.chartProps.y(d.freq_resp); });

    // @ts-ignore
    var svg = d3.select(this.chartElement.nativeElement)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scale the range of the data
    this.chartProps.x.domain(
        // @ts-ignore
        d3.extent(_this.valueChartStatus, function (d) {
          if (d.date instanceof Date)
            return (d.date as Date).getTime();
        }));
    // @ts-ignore
    this.chartProps.y.domain([0, d3.max(this.valueChartStatus, function (d) {
      // @ts-ignore
      return Math.max(d.hr, d.press_min, d.press_max, d.freq_resp);
    })]);

    // Add the valueline path.

    svg.append('path')
        .attr('class', 'line line2')
        .style('stroke', 'blue')
        .style('fill', 'none')
        // @ts-ignore
        .attr('d', valueline2(_this.valueChartStatus));

    svg.append('path')
        .attr('class', 'line line3')
        .style('stroke', 'fuchsia')
        .style('fill', 'none')
        // @ts-ignore
        .attr('d', valueline3(_this.valueChartStatus));

    svg.append('path')
        .attr('class', 'line line4')
        .style('stroke', 'green')
        .style('fill', 'none')
        // @ts-ignore
        .attr('d', valueline4(_this.valueChartStatus));

    svg.append('path')
        .attr('class', 'line line1')
        .style('stroke', 'red')
        .style('fill', 'none')
        // @ts-ignore
        .attr('d', valueline(_this.valueChartStatus));

    // Add the X Axis
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis);

    // Add the Y Axis
    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);

    // Setting the required objects in chartProps so they could be used to update the chart
    this.chartProps.svg = svg;
    this.chartProps.valueline = valueline;
    this.chartProps.valueline2 = valueline2;
    this.chartProps.valueLine3 = valueline3;
    this.chartProps.valueline4 = valueline4;
    this.chartProps.xAxis = xAxis;
    this.chartProps.yAxis = yAxis;
  }

  updateChart() {
    let _this = this;
    this.formatDate();

    this.time = this.formatDateTime(new Date());

    // Scale the range of the data again
    // @ts-ignore
    this.chartProps.x.domain(d3.extent(this.valueChartStatus, function (d) {
      if (d.date instanceof Date) {
        return d.date.getTime();
      }
    }));

    // @ts-ignore
    this.chartProps.y.domain([0, d3.max(this.valueChartStatus, function (d) {
      // @ts-ignore
      _this.updateValue(d.hr, d.press_min, d.press_max, d.freq_resp);
      // @ts-ignore
      return Math.max(d.hr, d.press_min, d.press_max, d.freq_resp);
    })]);

    // Select the section we want to apply our changes to
    this.chartProps.svg.transition();

    // Make the changes to the line chart
    this.chartProps.svg.select('.line.line1') // update the line
        .attr('d', this.chartProps.valueline(this.valueChartStatus));

    this.chartProps.svg.select('.line.line2') // update the line
        .attr('d', this.chartProps.valueline2(this.valueChartStatus));

    this.chartProps.svg.select('.line.line3') // update the line
        .attr('d', this.chartProps.valueLine3(this.valueChartStatus));

    this.chartProps.svg.select('.line.line4') // update the line
        .attr('d', this.chartProps.valueline4(this.valueChartStatus));

    this.chartProps.svg.select('.x.axis') // update x axis
        .call(this.chartProps.xAxis);

    this.chartProps.svg.select('.y.axis') // update y axis
        .call(this.chartProps.yAxis);

  }

  ngOnChanges() {
    if (this.valueChartStatus && this.chartProps) {
      this.updateChart();
    } else if (this.valueChartStatus) {
      this.buildChart();
    }
  }

  updateValue(hr: number, press_min: number, press_max: number, freq_resp: number) {
    this.hr = Math.round(hr);
    this.press_min = Math.round(press_min);
    this.press_max = Math.round(press_max);
    this.freq_resp = Math.round(freq_resp);
  }

  formatDate() {
    // @ts-ignore
    this.valueChartStatus.forEach(ms => {
      if (typeof ms.date === 'string') {
        // @ts-ignore
        ms.date = this.parseDate(ms.date);
      }
    });
  }

  formatDateTime(data: any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(data, 'dd/MM/yyyy HH:mm:ss');
  }

}
