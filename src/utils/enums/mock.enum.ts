export enum queries {
    query = `
    select 
        r.id_repository as id,
        r.name as name,
        t.name as tribe,
        o.name as organization,
        m.coverage,
        m.code_smells as codeSmells,
        m.bugs as bugs,
        m.vulnerabilities,
        m.hotspot as hotspots,
        r.state
    from 
        repository r 
        join metrics m on m.id_repository = r.id_repository 
        join tribe t on t.id_tribe = r.id_tribe
        join organization o on o.id_organization = t.id_organizaation 
    where 
        r.id_tribe = 1
        and o.deleted = false
        and m.coverage >= 0.75
        and year(r.create_time) = year(current_date);
    
    `
}