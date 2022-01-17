import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import {ScaleBand} from 'd3';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  private data = [
    {"Framework": "Lunes", "Stars": "166443", "BigBag": "156443", "Released": "2014"},
    {"Framework": "Martes", "Stars": "150793","BigBag": "146443", "Released": "2013"},
    {"Framework": "Miercoles", "Stars": "62342","BigBag": "61443", "Released": "2016"},
    {"Framework": "Jueves", "Stars": "27647","BigBag": "25443", "Released": "2010"},
    {"Framework": "Viernes", "Stars": "21471","BigBag": "102443", "Released": "2011"},
    {"Framework": "Sabado", "Stars": "21471","BigBag": "102443", "Released": "2011"},
    {"Framework": "Domingo", "Stars": "21471","BigBag": "102443", "Released": "2011"},
  ];
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor() { }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}

private drawBars(data: any[]): void {
  // Create the X-axis band scale
  const x = d3.scaleBand()
  .range([0, this.width])
  .domain(data.map(d => d.Framework))
  .padding(0.2);

  // Draw the X-axis on the DOM
  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

  // Create the Y-axis band scale
  const y = d3.scaleLinear()
  .domain([0, 200000])
  .range([this.height, 0]);

  // Draw the Y-axis on the DOM
  this.svg.append("g")
  .call(d3.axisLeft(y));

  // Create and fill the bars
  this.svg.selectAll("bars")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", d => x(d.Framework))
  .attr("y", d => y(d.Stars))
  .attr("width", x.bandwidth())
  .attr("height", (d) => this.height - y(d.Stars))
  .attr("fill", "#d04a35");

  this.svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("path")
        .style("stroke", "blue")
        .style("stroke-width", 2)
        .attr("d", function(d){
          var rv = "M" + x(d.Framework) + "," + y(d.BigBag);
          rv += "L" + (x(d.Framework)+ x.bandwidth() ) + "," + y(d.BigBag);
          console.log(rv);
          return rv;
        });

}

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
  }

}
