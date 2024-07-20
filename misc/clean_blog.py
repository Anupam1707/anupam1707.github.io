def format_text(text):
    # Replace double quotes with single quotes
    text = text.replace('"', "'")
    
    # Add \n for new lines where necessary
    paragraphs = text.split('\n\n')
    formatted_text = '\n\n'.join(paragraphs)
    
    return formatted_text
