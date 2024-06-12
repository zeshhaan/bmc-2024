import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  let response = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.API_TOKEN}`,
    },
  });
  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params;
  let response = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${import.meta.env.API_TOKEN}`,
    },
  });
  if (response.ok) {
    return new Response(
      JSON.stringify({ message: "User deleted successfully" }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    return new Response(JSON.stringify({ message: "An error occurred" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  const { id } = params;
  const data = await request.json();

  try {
    const response = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${import.meta.env.API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return new Response(
        JSON.stringify({ message: "User updated successfully" }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      const errorData = await response.json();

      return new Response(
        JSON.stringify({
          message: response.statusText,
          errorData,
          status: response.status,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "An error occurred" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
