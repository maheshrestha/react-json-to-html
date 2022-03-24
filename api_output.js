var api_list_output = {
  results: [
    {
      id: "269491",
      state: "confirmed",
      total_chargeable_from_payer: "0.00",
      currency: "AUD",
      archived_at: "2021-12-22T14:00:59.000+11:00",
      time_zone: "Sydney",
      created_at: "2021-12-22T14:00:59.482+11:00",
      transactable: {
        id: "269491",
        name: "Meet and Greet",
      },
      creator: {
        id: "65866",
        name: "James Pradhan",
        carer_profile: {
          id: "65866",
          organisation_name: "test",
        },
      },
      transactable_line_items: [
        {
          id: 269491,
          quantity: 1.0,
        },
      ],
      quantity: 2,
      unit_type_service_end_time: "333",
      number_of_reoccurance: "333",
      consumer_address: "13 Mumshirl St, Bonner ACT 2914, Australia",
      participant_id: "333",
      client_name: "333",
      reference: "123",
      payment_type: "free",
      recurring_frequency: "weekly",
      invoice_id: "333",
      bill_id: "111",
      recurring_end_date: "2021-12-21T09:00:00.000+11:00",
      starts_at: "2021-12-21T09:00:00.000+11:00",
      ends_at: "2021-12-21T09:30:00.000+11:00",
      manager_id: "65889",
      user: {
        id: "65889",
        name: "myCSN API TESTING Lenon",
        first_name: "myCSN API TESTING",
        last_name: "Lenon",
        slug: "mycsn-api-testing-lenon",
      },
      periods: [
        {
          id: 269491,
          date: "2021-12-21",
          start_minute: 540,
          end_minute: 570,
        },
      ],
      payment: {
        id: "65889",
        paid_at: "2021-12-21",
        failed_at: "2021-12-21",
      },
    },
  ],
};

module.exports = {
  api_list_output,
};
