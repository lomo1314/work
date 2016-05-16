<?php get_header(); ?>
<div class="container">
	<div class="row">
		<div class="col-sm-8" id="post-list">
			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
			<?php get_template_part('loop'); ?>
			<?php endwhile; ?><?php endif; ?>
			<ul id="pager" class="pagination">
				<?php par_pagenavi(9); ?>
			</ul>
		</div>
		<?php get_sidebar(); ?>
	</div>
</div>
<?php get_footer(); ?>