<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON data from request body
    $json = file_get_contents("php://input");
    $data = json_decode($json, true);
    
    // Validate data
    $name = isset($data['name']) ? strip_tags(trim($data['name'])) : '';
    $email = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
    $subject = isset($data['subject']) ? strip_tags(trim($data['subject'])) : '';
    $message = isset($data['message']) ? strip_tags(trim($data['message'])) : '';

    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        http_response_code(400);
        echo json_encode(["error" => "All fields are required"]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid email format"]);
        exit;
    }

    // --- Configuration ---
    $your_email = "hello@devpro.com"; // TODO: CHANGE THIS TO YOUR ACTUAL EMAIL
    $site_name = "My Portfolio";
    // ---------------------

    // 1. Send Email to You (The Owner)
    $to_owner = $your_email;
    $subject_owner = "New Portfolio Message: " . $subject;
    
    $headers_owner = "MIME-Version: 1.0" . "\r\n";
    $headers_owner .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers_owner .= "From: <" . $email . ">" . "\r\n";
    $headers_owner .= "Reply-To: <" . $email . ">" . "\r\n";

    $body_owner = "
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;'>
            <h2 style='color: #00f0ff;'>New Message Received</h2>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Subject:</strong> {$subject}</p>
            <hr style='border: 0; border-top: 1px solid #eee; margin: 20px 0;'>
            <p><strong>Message:</strong></p>
            <p style='white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 5px;'>{$message}</p>
        </div>
    ";

    $mail_to_owner = mail($to_owner, $subject_owner, $body_owner, $headers_owner);

    // 2. Send Auto-Reply to the Visitor
    $subject_reply = "Thank you for reaching out!";
    $headers_reply = "MIME-Version: 1.0" . "\r\n";
    $headers_reply .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers_reply .= "From: " . $site_name . " <" . $your_email . ">" . "\r\n";

    $body_reply = "
        <div style='font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; line-height: 1.6; color: #333;'>
            <h1 style='color: #00f0ff; text-align: center;'>Hello {$name}!</h1>
            <p>Thank you for contacting me. I have received your message regarding <strong>'{$subject}'</strong>.</p>
            <p>I will review your inquiry and get back to you as soon as possible (usually within 24-48 hours).</p>
            <br>
            <p>Best Regards,</p>
            <p><strong>{$site_name} Team</strong></p>
        </div>
    ";

    mail($email, $subject_reply, $body_reply, $headers_reply);

    if ($mail_to_owner) {
        echo json_encode(["message" => "Message sent successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to send email. Please check server mail configurations."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>
