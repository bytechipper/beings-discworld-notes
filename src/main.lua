local panel_handle = nil

local function load_note()
    return storage.get("note") or ""
end

local function save_note(text)
    storage.set("note", text)
end

local function init_panel()
    panel_handle = mud.panel("beings-discworld-notes")

    panel_handle:on_message("ready", function(_)
        panel_handle:post("content", { text = load_note() })
    end)

    panel_handle:on_message("save", function(data)
        if data.text then
            save_note(data.text)
        end
    end)
end

world.on("connect", function()
    if panel_handle then
        panel_handle:post("content", { text = load_note() })
    end
end)

init_panel()
