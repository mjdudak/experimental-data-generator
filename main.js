function generateData(ev) {
    const tbody = document.querySelector("#data-body")
    const template = document.querySelector("#data-row")
    const latex_body = document.querySelector("#latex-code > tbody")
    const latex_template = document.querySelector("#latex-row")
    const latex_before = document.querySelector("#end-of-latex-table")
    for (r of tbody.querySelectorAll("#normal-data-row")) {
        r.remove()
    }
    for (r of latex_body.querySelectorAll("#latex-data-row")) {
        r.remove()
    }
    const num_obs = parseInt(document.querySelector("#num-obs").value)
    const ind_min = parseFloat(document.querySelector("#ind-min").value)
    const ind_delta = parseFloat(document.querySelector("#ind-delta").value)
    const relationship = math.parse(document.querySelector("#var-relat").value)
    const error = parseInt(document.querySelector("#customRange1").value)
    const eqn = relationship.compile()
    let inds = Array(num_obs)
    let deps = Array(num_obs)
    const ind_max = ind_min + (num_obs*ind_delta)
    const dep_max = eqn.evaluate({x: ind_max})
    const dep_min = eqn.evaluate({x: ind_min})
    const dep_range = (dep_max - dep_min)    
    for (let i=0; i<=num_obs; i++) {
        inds[i] = ind_min + (ind_delta*i)
        const scope = {x: inds[i]}
        deps[i] = eqn.evaluate(scope) + ((dep_range/num_obs)*(Math.random()-0.5)*error/100)//NEED RANDOMIZER
        const clone = template.content.cloneNode(true)
        let td = clone.querySelectorAll("td")
        td[0].textContent = inds[i]
        td[1].textContent = deps[i]
        tbody.appendChild(clone)
        const latex_clone = latex_template.content.cloneNode(true)
        let latex_td = latex_clone.querySelector("td")
        latex_td.textContent = inds[i] + "&" + deps[i] + "\\\\"
        latex_body.insertBefore(latex_clone, latex_before)
    }
    console.log(deps)
}


document.querySelector("#output").addEventListener("click", generateData)