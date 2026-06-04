$(function() {

    // NOTE: This form submits natively (no AJAX) on purpose. FormSubmit's
    // autoresponse / confirmation email to the sender does NOT fire for AJAX
    // submissions, so we let the browser POST the form and rely on the _next
    // redirect (the /thanks/ page) for on-site confirmation. We still run
    // client-side validation and just allow the default submit to proceed.
    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            var $submitButton = $form.find('button[type="submit"]');
            $submitButton.prop('disabled', true).html('Sending&hellip;');
            // Let the browser perform the native POST so the autoresponse fires.
            $form[0].submit();
        },

        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
