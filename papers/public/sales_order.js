frappe.ui.form.on('Sales Order Item', {
    stock_qty:function(frm,cdt,cdn){
        let doc =locals[cdt][cdn]
        if(doc.uom =="Kgs"){
            let qty = doc.stock_qty/doc.conversion_factor
            frappe.model.set_value(cdt, cdn, 'qty', qty)
        }
    },
    
     reverse_conversion_factor:function(frm,cdt,cdn){ 
        let doc =locals[cdt][cdn];
        
            if (doc.reverse_conversion_factor){
                let conversion_factor =1/doc.reverse_conversion_factor
                frappe.model.set_value(cdt, cdn, 'conversion_factor', conversion_factor.toPrecision(3))
            }
       
    },  
    stock_uom_rate:function(frm,cdt,cdn){ 
        let doc =locals[cdt][cdn];
            if (doc.uom =="Kgs"){
                let rate = ((doc.stock_qty*doc.stock_uom_rate)/doc.qty);
                frappe.model.set_value(cdt, cdn, 'rate', rate)
            }
       
    }, 
    
});
       

    
