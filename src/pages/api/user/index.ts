import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  console.log("POST request received");
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const gender = data.get("gender");
  const status = data.get("status");

  if (!name || !email || !gender || !status) {
    return new Response(
      JSON.stringify({ message: "All fields are required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const response = await fetch("https://gorest.co.in/public/v2/users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, gender, status }),
    });
    if (response.ok) {
      const userData = await response.json();
      const userId = userData.id;

      return new Response(
        JSON.stringify({
          message: "User created successfully",
          userId,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      const errorData = await response.json();
      return new Response(JSON.stringify({ message: errorData }), {
        status: response.status,
        statusText: response.statusText,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "An error occurred", error }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

export const GET: APIRoute = async ({ params }) => {
  let response = await fetch(`https://gorest.co.in/public/v2/users`);
  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
