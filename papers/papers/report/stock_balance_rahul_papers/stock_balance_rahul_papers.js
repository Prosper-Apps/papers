// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors and contributors
// For license information, please see license.txt
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
frappe.query_reports["Stock Balance Rahul Papers"] = {
	onload: function() {
		var item_code = getUrlParameter("item_code");
		var item_group = getUrlParameter('item_group');
		var warehouse = getUrlParameter('warehouse');
		if(item_group){
			frappe.query_report.set_filter_value('item_group', item_group);
		}
		if(warehouse){
			frappe.query_report.set_filter_value('warehouse', warehouse);
		}
		if(item_code){
			frappe.query_report.set_filter_value('item_code', item_code);
		}
	},
	"filters": [
		{
			"fieldname": "company",
			"label": __("Company"),
			"fieldtype": "Link",
			"width": "80",
			"options": "Company",
			"default": frappe.defaults.get_default("company")
		},
		{
			"fieldname":"from_date",
			"label": __("From Date"),
			"fieldtype": "Date",
			"width": "80",
			"reqd": 1,
			"default": frappe.datetime.add_months(frappe.datetime.get_today(), -1),
		},
		{
			"fieldname":"to_date",
			"label": __("To Date"),
			"fieldtype": "Date",
			"width": "80",
			"reqd": 1,
			"default": frappe.datetime.get_today()
		},
		{
			"fieldname": "item_group",
			"label": __("Item Group"),
			"fieldtype": "Link",
			"width": "80",
			"options": "Item Group"
		},
		{
			"fieldname": "item_code",
			"label": __("Item"),
			"fieldtype": "Link",
			"width": "80",
			"options": "Item",
			"get_query": function() {
				return {
					query: "erpnext.controllers.queries.item_query",
				};
			}
		},
		{
			"fieldname": "warehouse",
			"label": __("Warehouse"),
			"fieldtype": "Link",
			"width": "80",
			"options": "Warehouse",
			get_query: () => {
				let warehouse_type = frappe.query_report.get_filter_value("warehouse_type");
				let company = frappe.query_report.get_filter_value("company");

				return {
					filters: {
						...warehouse_type && {warehouse_type},
						...company && {company}
					}
				}
			}
		},
		{
			"fieldname": "warehouse_type",
			"label": __("Warehouse Type"),
			"fieldtype": "Link",
			"width": "80",
			"options": "Warehouse Type"
		},
		{
			"fieldname":"include_uom",
			"label": __("Include UOM"),
			"fieldtype": "Link",
			"options": "UOM"
		},
		{
			"fieldname": "show_variant_attributes",
			"label": __("Show Variant Attributes"),
			"fieldtype": "Check"
		},
		{
			"fieldname": 'show_stock_ageing_data',
			"label": __('Show Stock Ageing Data'),
			"fieldtype": 'Check'
		},
	],

	"formatter": function (value, row, column, data, default_formatter) {
		value = default_formatter(value, row, column, data);

		if (column.fieldname == "out_qty" && data && data.out_qty > 0) {
			value = "<span style='color:red'>" + value + "</span>";
		}
		else if (column.fieldname == "in_qty" && data && data.in_qty > 0) {
			value = "<span style='color:green'>" + value + "</span>";
		}

		return value;
	}
};

frappe.provide("papers")
finbyzerp.open_stock_ledger = {
open_stock_ledger: function(item_code,warehouse) {

	frappe.route_options = {
		"company": frappe.query_report.get_filter_value('company'),
		"from_date": frappe.query_report.get_filter_value('from_date') || data.year_start_date,
		"to_date": frappe.query_report.get_filter_value('to_date') || data.to_date || data.year_end_date,
		"item_code": item_code|| frappe.query_report.get_filter_value('item_code'),
		"warehouse": warehouse || frappe.query_report.get_filter_value('warehouse')
	};
	let route = window.location.href.split("/app")[0]+"/app/query-report/Stock%20Ledger?company="+ frappe.route_options.company+"&from_date="+frappe.route_options.from_date+"&to_date="+frappe.route_options.to_date+"&warehouse="+frappe.route_options.warehouse+"&item_code="+frappe.route_options.item_code
	window.open(route, '_blank')
	
}
}