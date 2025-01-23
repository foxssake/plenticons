@tool
extends Node

func generate_previews():
	# Clear children
	for child in get_children():
		remove_child(child)
		child.queue_free()

	# Generate previews
	var directory = "res://icons"
	var da := DirAccess.open(directory)
	var dummy_script := load("res://scripts/dummy-script.gd") as Script

	for category in da.get_directories():
		var category_node := Node.new()
		category_node.name = category
		add_child(category_node)
		category_node.owner = get_tree().edited_scene_root
		print("Added category node %s with owner %s" % [category_node, owner])

		for icon in da.get_files_at(directory + "/" + category):
			if not icon.ends_with(".png") and not icon.ends_with(".svg"):
				continue

			var icon_script := dummy_script.duplicate() as Script
			icon_script.source_code = "@icon(\"%s/%s/%s\")\nextends Node\n" % [directory, category, icon]
			icon_script.reload()

			var icon_node := Node.new()
			icon_node.name = icon.get_basename()
			icon_node.set_script(icon_script)
			category_node.add_child(icon_node)
			icon_node.owner = category_node.owner

func _notification(what: int) -> void:
	if what == NOTIFICATION_EDITOR_PRE_SAVE:
		generate_previews.call_deferred()

func _ready() -> void:
	generate_previews()
