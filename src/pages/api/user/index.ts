import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  console.log("POST request received");
  const data = await request.json();
  try {
    const response = await fetch("https://gorest.co.in/public/v2/users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
      return new Response(
        JSON.stringify({ message: errorData, status: response.status }),
        {
          status: response.status,
          statusText: response.statusText,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
