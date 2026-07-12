const company = await createCompanyService({

  name: body.name,
  legalName: body.legalName,
  industry: body.industry,
  country: body.country,
  currency: body.currency,
  fiscalYear: body.fiscalYear,

  email: body.email ?? null,
  phone: body.phone ?? null,
  address: body.address ?? null,

});